import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin

load_dotenv()

# Create a Flask Instance
app = Flask(__name__)

# Secret Key
app.config['SECRET_KEY'] = "123456"

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
CORS(app)
# Initialize the database
db = SQLAlchemy(app)


# Models

# User Model
class user(db.Model):
    EmployeeID = db.Column(db.Integer, primary_key=True)
    Password = db.Column(db.String(20), nullable=False)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Age = db.Column(db.Integer, nullable=False)

    # Create A String
    def __repr__(self):
        return '<Name %r>' % self.firstName
    
    def json(self):
        return {
            "employeeID": self.EmployeeID,
            "password": self.Password,
            "firstName": self.FirstName,
            "lastName": self.LastName,
            "age": self.Age
        }

# Insurance Policies Model


class insurancepolicies(db.Model):
    InsuranceID = db.Column(db.Integer, primary_key=True)
    EmployeeID = db.Column(
        db.Integer, db.ForeignKey('user.EmployeeID'), nullable=False)
    InsuranceType = db.Column(db.String(100), nullable=False)
    PolicyTerm = db.Column(db.String(100), nullable=False)
    PolicyStartDate = db.Column(db.String(255), nullable=False)
    PolicyEndDate = db.Column(db.String(255), nullable=False)
    ClaimLimit = db.Column(db.Float, nullable=False)
    RemainingClaimLimit = db.Column(db.Float, nullable=False)


class insuranceclaims(db.Model):
    ClaimID = db.Column(db.Integer, primary_key=True)
    InsuranceID = db.Column(db.Integer, db.ForeignKey(
        'insurancepolicies.InsuranceID'), nullable=False,)
    FirstName = db.Column(db.Text, nullable=False)
    LastName = db.Column(db.Text)
    ExpenseDate = db.Column(db.Text)
    Amount = db.Column(db.Float)
    Purpose = db.Column(db.Text)
    FollowUp = db.Column(db.Boolean)
    PreviousClaimID = db.Column(db.Integer)
    Status = db.Column(db.Text)
    LastEditedClaimDate = db.Column(db.Text)

    def repr(self):
        return '<claimId %r>' % self.ClaimID


# Routes

# test route
@app.route('/')
def index():
    return os.getenv("DATABASE_URL")

# Login
@app.route('/login', methods=['POST'])
def login():
    employeeID = request.json['employeeID']
    password = request.json['password']
    users = user.query.filter_by(EmployeeID=employeeID).first()

    if users:
        if users.Password == password:
            return users.json()
        else:
            return "Incorrect password"
    else:
        return "User not found"

# get all claims by claimId
@app.route('/claims/<int:employeeID>', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def get_claims(employeeID):
    claims = []
    policies = insurancepolicies.query.filter_by(
        EmployeeID=employeeID).all()

    for policy in policies:
        claims += insuranceclaims.query.filter_by(
            InsuranceID=policy.InsuranceID).all()
    response = jsonify(
        {
        'claims': [
            {
                'ClaimID': claim.ClaimID,  # 2010
                'InsuranceID': claim.InsuranceID,
                'FirstName': claim.FirstName,
                'LastName': claim.LastName,
                'ExpenseDate': claim.ExpenseDate,
                'Amount': claim.Amount,
                'Purpose': claim.Purpose,
                'FollowUp': claim.FollowUp,
                'PreviousClaimID': claim.PreviousClaimID,
                'Status': claim.Status,
                'LastEditedClaimDate': claim.LastEditedClaimDate
            } for claim in claims
        ]
        }
    )
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@app.route('/insert_claim', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])

def insert_claim():
    claim = request.get_json()
    # print(claim)
    new_claim = insuranceclaims(
        ClaimID = claim['ClaimID'],
        InsuranceID=claim['InsuranceID'],
        FirstName=claim['FirstName'],
        LastName=claim['LastName'],
        ExpenseDate=claim['ExpenseDate'],
        Amount=claim['Amount'],
        Purpose=claim['Purpose'],
        FollowUp=0,
        PreviousClaimID=None,
        Status="Pending",
        LastEditedClaimDate=datetime.now()
    )
    print(new_claim)
    db.session.add(new_claim)
    db.session.commit()

    return {
        'message': 'Claim was added successfully'
    }

@app.route('/insurances/<int:InsuranceID>')
def get_policies(InsuranceID):
    insurances = insurancepolicies.query.filter_by(
        InsuranceID=InsuranceID).all()
    return {
        'Policies': [
            {
                "InsuranceID": insurance.InsuranceID,  # 1005
                "EmployeeID": insurance.EmployeeID,
                "Insurance Type": insurance.InsuranceType,
                "PolicyStartDate": insurance.PolicyStartDate,
                "PolicyTerm": insurance.PolicyTerm,
                "PolicyEndDate": insurance.PolicyEndDate,
                "ClaimLimit": insurance.ClaimLimit,
                "RemainingClaimLimit": insurance.RemainingClaimLimit
            } for insurance in insurances
        ]
    }


@app.route('/users/<int:EmployeeID>')
def get_users(EmployeeID):
    users = user.query.filter_by(
        EmployeeID=EmployeeID).all()
    return {
        'Users': [
            {
                "EmployeeID": users.EmployeeID,  # 58001001
                "Password": users.Password,
                "FirstName": users.FirstName,
                "LastName": users.LastName,
                "Age": users.Age
            } for users in users
        ]
    }

@app.route('/edit_claim', methods=['PUT'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])

def edit_claim():
    data = request.get_json()
    claim = insuranceclaims.query.get(data['ClaimID'])
    print(claim)
    if 'FirstName' in data and data['FirstName']:
        claim.FirstName = data['FirstName']
    if 'LastName' in data and data['LastName']:
        claim.LastName = data['LastName']
    if 'ExpenseDate' in data and data['ExpenseDate']:
        claim.ExpenseDate = data['ExpenseDate']
    if 'Amount' in data and data['Amount']:
        claim.Amount = data['Amount']
    if 'Purpose' in data and data['Purpose']:
        claim.Purpose = data['Purpose']
    if 'FollowUp' in data and data['FollowUp']:
        claim.FollowUp = data['FollowUp']
    if 'PreviousClaimID' in data and data['PreviousClaimID']:
        claim.PreviousClaimID = data['PreviousClaimID']
    if 'Status' in data and data['Status']:
        claim.Status = data['Status']
    if 'LastEditedClaimDate' in data and data['LastEditedClaimDate']:
        claim.LastEditedClaimDate = str(datetime.now())
    db.session.commit()
    return {
        'success': True
    }


@app.route('/delete_claim/<int:ClaimID>', methods=['DELETE'])
def delete_claim(ClaimID):
    claim = insuranceclaims.query.filter_by(ClaimID=ClaimID).first()
    db.session.delete(claim)
    db.session.commit()
    return {
        'success': True
    }

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)