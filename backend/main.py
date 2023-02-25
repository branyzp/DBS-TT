from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Create a Flask Instance
app = Flask(__name__)

# Secret Key
app.config['SECRET_KEY'] = "123456"

# Initialize the database
db = SQLAlchemy(app)


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

    def __repr__(self):
        return '<claimId %r>' % self.ClaimID

# get all claims by claimId
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

# User Model


class User(db.Model):
    UserID = db.Column(db.Integer, primary_key=True)
    Password = db.Column(db.String(20), nullable=False)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Age = db.Column(db.Integer, nullable=False)
    # name = db.Column(db.String(200), nullable=False)
    # email = db.Column(db.String(120), nullable=False, unique=True)
    # fav_colour = db.Column(db.String(120))
    # date_added = db.Column(db.DateTime, default=datetime.utcnow)

    # Create A String
    def __repr__(self):
        return '<Name %r>' % self.firstName


# Insurance Policies Model
class InsurancePolicies(db.Model):
    InsuranceID = db.Column(db.Integer, primary_key=True)
    EmployeeID = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    PolicyTerm = db.Column(db.String(100), nullable=False)
    PolicyStartDate = db.Column(db.String(255), nullable=False)
    PolicyEndDate = db.Column(db.String(255), nullable=False)
    ClaimLimit = db.Column(db.Float, nullable=False)
    RemainingClaimLimit = db.Column(db.Float, nullable=False)


# Insurance Claims Model
class InsuranceClaims(db.Model):
    ClaimID = db.Column(db.Integer, primary_key=True)
    InsuranceID = db.Column(
        db.Integer, db.ForeignKey('insurancepolicies.id'), nullable=False)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    ExpenseDate = db.Column(db.String(255), nullable=False)
    Amount = db.Column(db.Float, nullable=False)
    Purpose = db.Column(db.String(255), nullable=False)
    FollowUp = db.Column(db.Float, nullable=False)
    PreviousClaimID = db.Column(db.Integer)
    Status = db.Column(db.String(20), nullable=False)
    LastEditedClaimDate = db.Column(db.String(255), nullable=False)



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
