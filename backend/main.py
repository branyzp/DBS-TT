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
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    InsuranceType = db.Column(db.String(100), nullable=False)
    PolicyTerm = db.Column(db.String(100), nullable=False)
    PolicyStartDate = db.Column(db.String(255), nullable=False)
    PolicyEndDate = db.Column(db.String(255), nullable=False)
    ClaimLimit = db.Column(db.Float, nullable=False)
    RemainingClaimLimit = db.Column(db.Float, nullable=False)


class insuranceclaims(db.Model):
    ClaimID = db.Column(db.Integer, primary_key=True)
    InsuranceID = db.Column(db.Integer, db.ForeignKey(
        'insurancepolicies.id'), nullable=False,)
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
        return "Incorrect username"
    # if user is not None and user.password == password:
    #     return user
    # else:
    #     return "Failure"


# get all claims by claimId


@app.route('/claims/<int:employeeID>')
def get_claims(employeeID):
    claims = []
    policies = insurancepolicies.query.filter_by(
        EmployeeID=employeeID).all()

    for policy in policies:
        claims += insuranceclaims.query.filter_by(
            InsuranceID=policy.InsuranceID).all()

    return {
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


if __name__ == '__main__':
    app.run(debug=True)


# User Model
# @app.route('/')
# def user(name):
#     return render_template("user.html", user_name=name)

# @app.route('/delete/<int:id>')
# def delete(id):
#     user_to_delete = Users.query.get_or_404(id)
#     name = None
#     form = UserForm()

#     try:
#         db.session.delete(user_to_delete)
#         db.session.commit()
#         flash("User has been deleted Successfully!")
#         our_users = Users.query.order_by(Users.date_added)
#         return render_template("add_user.html",
#                                form=form,
#                                name=name,
#                                our_users=our_users
#                                )
#     except:
#         flash("Whoops! There was a problem deleting the user")
#         return render_template("add_user.html",
#                                form=form,
#                                name=name,
#                                our_users=our_users
#                                )

# # Create Model


# class Users(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(200), nullable=False)
#     email = db.Column(db.String(120), nullable=False, unique=True)
#     fav_colour = db.Column(db.String(120))
#     date_added = db.Column(db.DateTime, default=datetime.utcnow)

#     # Create A String
#     def __repr__(self):
#         return '<Name %r>' % self.name


# # Create form class
# class UserForm(FlaskForm):
#     name = StringField("Name", validators=[DataRequired()])
#     email = StringField("Email", validators=[DataRequired()])
#     fav_colour = StringField("Favourite Colour")
#     submit = SubmitField("Submit")


# # Update Database Record
# @app.route('/update/<int:id>', methods=['GET', 'POST'])
# def update(id):
#     form = UserForm()
#     name_to_update = Users.query.get_or_404(id)
#     if request.method == "POST":
#         name_to_update.name = request.form['name']
#         name_to_update.email = request.form['email']
#         name_to_update.fav_colour = request.form['fav_colour']

#         try:
#             db.session.commit()
#             flash("User Updated Successfully!")
#             return render_template("update.html",
#                                    form=form,
#                                    name_to_update=name_to_update
#                                    )
#         except:
#             flash("Error! Looks like there was a problem. ")
#             return render_template("update.html",
#                                    form=form,
#                                    name_to_update=name_to_update
#                                    )
#     else:
#         return render_template("update.html",
#                                form=form,
#                                name_to_update=name_to_update,
#                                id=id
#                                )

# # Create Form class


# class NamerForm(FlaskForm):
#     name = StringField("What's your name", validators=[DataRequired()])
#     submit = SubmitField("Submit")


# @app.route('/user/add', methods=['GET', 'POST'])
# def add_user():
#     name = None
#     form = UserForm()
#     if form.validate_on_submit():
#         user = Users.query.filter_by(email=form.email.data).first()
#         if user is None:
#             user = Users(name=form.name.data, email=form.email.data,
#                          fav_colour=form.fav_colour.data)
#             db.session.add(user)
#             db.session.commit()
#         name = form.name.data
#         form.name.data = ''
#         form.email.data = ''
#         form.fav_colour.data = ''
#         flash("User Added Successfully!")
#     our_users = Users.query.order_by(Users.date_added)
#     return render_template("add_user.html",
#                            form=form,
#                            name=name,
#                            our_users=our_users
#                            )


# # Create a route decorator
# @app.route('/')
# def index():
#     # FILTERS
#     # safe
#     # capitalize
#     # lower
#     # upper
#     # title
#     # trim
#     # striptags
#     favourite_pizza = ["Pepperoni", "Cheese", "Mushrooms", 41]
#     stuff = "This is a <strong>Bold</strong> text."
#     return render_template(
#         "index.html",
#         stuff=stuff,
#         fav_pizza=favourite_pizza
#     )


# # localhost:5000/user/john
# @app.route('/user/<name>')
# def user(name):
#     return render_template("user.html", user_name=name)

# # Create Custom Error Pages


# # Invalid URL
# @app.errorhandler(404)
# def page_not_found(e):
#     return render_template("404.html"), 404


# # Internal Server Error Thing
# @app.errorhandler(500)
# def page_not_found(e):
#     return render_template("500.html"), 500


# # Create Name Page
# @app.route('/name', methods=['GET', 'POST'])
# def name():
#     name = None
#     form = NamerForm()
#     # Validate Form
#     if form.validate_on_submit():
#         name = form.name.data
#         form.name.data = ''
#         flash("Form Submitted Successfully")
#     return render_template("name.html",
#                            name=name,
#                            form=form
#                            )
