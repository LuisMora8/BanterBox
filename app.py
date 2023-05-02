from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import Users, Comments, Posts, Likes, app, db

from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from wtforms.widgets import TextArea

# app = Flask(__name__)

BASE = "http://127.0.0.1:5000"

# Admin Subclasses
class ChildView(ModelView):
    column_display_pk = True
    column_hide_backrefs = False
    #column_list = ('id', 'name', 'parent')

class UserView(ModelView):
    column_display_pk = True
    column_hide_backrefs = False
    list_columns = ('id', 'name', 'email', 'password')
    form_columns = ('id', 'name', 'email', 'password')

class PostsView(ModelView):
    column_display_pk = True
    column_hide_backrefs = False
    list_columns = ('numkey', 'user_id', 'post_header','post_body')
    form_columns = ('numkey', 'user_id', 'post_header','post_body')

class CommentView(ModelView):
    column_display_pk = True
    column_hide_backrefs = False
    list_columns = ('numkey', 'user_id', 'post_numkey','body')
    form_columns = ('numkey', 'user_id', 'post_numkey','body')

class LikesView(ModelView):
    column_display_pk = True
    column_hide_backrefs = False
    list_columns = ('id', 'comment_numkey', 'post_numkey')
    form_columns = ('id', 'comment_numkey', 'post_numkey')



@app.route('/')
def index():
    return render_template('profile.html')

""" User Profile """
@app.route('/<userid>/profile/', methods=['GET', 'POST'])
def profile(userid):
    # Find the user by id
    user = Users.query.filter_by(id=userid).first()
    # Find all the posts from the user
    posts = Posts.query.filter_by(user_id=userid).all()
    # Return as List
    output = [user_to_dict(user), posts_to_dicts(posts)]
    print(output)
    return jsonify(output)

# Convert the user from SQL objects to dictionary (for JSON)
def user_to_dict(user):
    output = {}
    output["id"] = user.id
    output["name"] = user.name
    output["profile_pic"] = user.profile_pic
    return output

# Convert the posts from SQL objects to dictionary (for JSON)
def posts_to_dicts(posts):
    output = []
    for post in posts:
        p = {}
        p["user_id"] = post.user_id
        p["post_header"] = post.post_header
        p["post_body"] = post.post_body
        output.append(p)
    return output

# Driver Code
if __name__ == '__main__':

# Admin
    with app.app_context():
        #Login.__table__.drop(db.engine)
        db.create_all()
        # admin = Admin(app)
        # admin.add_view(UserView(Users, db.session))
        # admin.add_view(PostsView(Posts, db.session))
        # admin.add_view(CommentView(Comments, db.session))
        # admin.add_view(LikesView(Likes, db.session))
    app.run(debug=True)