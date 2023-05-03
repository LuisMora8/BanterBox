from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

# Flask and SQLDatabase configuaration
app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite"
db = SQLAlchemy(app)

# Database Models
class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String,unique=True, nullable=False)
    password = db.Column(db.String,unique = True, nullable=False)
    profile_pic = db.Column(db.String)
    
    def __init__(self, id, name, email, password, pic) :
        super().__init__()
        self.id = id
        self.name = name
        self.email = email
        self.password = password
        self.profile_pic = pic

class Posts(db.Model):
    __tablename__ = 'posts'

    numkey = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_header = db.Column(db.String)
    post_body = db.Column(db.String)
    post_pic = db.Column(db.String)

    def __init__(self, numkey,user_id, header, body, pic):
        super().__init__()
        self.numkey = numkey
        self.user_id = user_id
        self.post_header = header
        self.post_body = body
        self.post_pic = pic





class Comments(db.Model):
    __tablename__ = 'comments'

    numkey = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_numkey = db.Column(db.Integer, db.ForeignKey('posts.numkey'))
    body = db.Column(db.String)
    

    def __init__(self, numkey,userid,post_numkey, body) :
        super().__init__()
        self.numkey = numkey
        self.users_id=userid
        self.post_numkey = post_numkey
        self.body = body

class Likes(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    comment_numkey = db.Column(db.Integer, db.ForeignKey('comments.numkey'))
    post_numkey= db.Column(db.Integer, db.ForeignKey('posts.numkey'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, id,commentNumkey,postnumkey,user_id):
        super().__init__()
        self.id = id
        self.comment_numkey = commentNumkey
        self.post_numkey = postnumkey
        self.user_id = user_id
        
if __name__ == '__main__':
    db.drop_all()
    db.create_all()