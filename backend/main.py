import os
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Create a Flask Instance
app = Flask(__name__)

# Secret Key
app.config['SECRET_KEY'] = "123456"

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")

# Initialize the database
db = SQLAlchemy(app)

# Models
class insuranceclaims(db.Model):
    ClaimID = db.Column(db.Integer, primary_key=True)
    InsuranceID = db.Column(db.Integer, nullable=False)
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

## Routes

# get all claims by claimId # TODO: use employeeID
@app.route('/claims/<int:ClaimID>')
def get_claims(ClaimID):
    claims = insuranceclaims.query.filter_by(ClaimID=ClaimID).all()
    # print(claims)
    return {
        'claims': [
            {
                'ClaimID': claim.ClaimID,
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

if __name__ == '__main__':
    app.run(debug=True)