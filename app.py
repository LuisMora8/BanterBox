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
    return render_template('thread.html')

""" Get User Profile """
@app.route('/<userid>/profile/', methods=['GET', 'POST'])
def displayProfile(userid):
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

""" Get Thread / Post Comment """
@app.route('/thread<thread_id>/<user_id>/', methods=['GET', 'POST'])
def displayThread(thread_id, user_id):
    # Find user by id
    user = Users.query.filter_by(id=user_id).first()
    # Find the thread by id
    thread = Posts.query.filter_by(numkey=thread_id).first()

    # Add comment to the Database
    if request.method == 'POST':
        # Get last comment numkey
        all_comments = Comments.query.all()
        last_comment = all_comments[-1]
        # Create new comment and to DB
        new_comment = Comments(last_comment.numkey+1,user.id,thread.numkey, request.json['comment_body'])
        db.session.add(new_comment)
        db.session.commit()

    # Find all the comments from the thread
    comments = Comments.query.filter_by(post_numkey=thread_id).all()
    # Return data to generate thread
    output = [user_to_dict(user), post_to_dict(thread), comments_to_dicts(comments)]
    return jsonify(output)

# Convert the post from SQL object to dictionary (for JSON)
def post_to_dict(post):
    p = {}
    p["id"] = post.numkey
    p["user_id"] = post.user_id
    p["post_header"] = post.post_header
    p["post_body"] = post.post_body
    p["post_pic"] = post.post_pic
    return p

# Convert the posts from SQL objects to dictionary (for JSON)
def comments_to_dicts(comments):
    output = []
    for comment in comments:
        c = {}
        c["id"] = comment.numkey
        c["user_id"] = comment.users_id
        c["post_id"] = comment.post_numkey
        c["body"] = comment.body
        # Query number of likes
        likes = Likes.query.filter_by(comment_numkey=comment.numkey).all()
        c["num_likes"] = len(likes)
        # Query user for name
        user = Users.query.filter_by(id=comment.users_id).first()
        c["name"] = user.name
        output.append(c)
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