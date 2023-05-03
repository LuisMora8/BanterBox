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
    list_columns = ('numkey', 'users_id', 'post_numkey','body')
    form_columns = ('numkey', 'users_id', 'post_numkey','body')

class LikesView(ModelView):
    column_display_pk = True
    column_hide_backrefs = False
    list_columns = ('id', 'comment_numkey', 'post_numkey')
    form_columns = ('id', 'comment_numkey', 'post_numkey')


# @app.route('/admin')
# def adminShow():
#     return redirect('/admin')
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
    output = [user_to_dict(user), post_to_dict(thread), comments_to_dicts(comments, user_id)]
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
def comments_to_dicts(comments, user_id):
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
        # Query if user has liked this comment
        if Likes.query.filter_by(comment_numkey=comment.numkey, user_id=user_id).first() == None:
            c["liked_by_user"] = False
        else:
            c["liked_by_user"] = True
        output.append(c)
    return output

""" Like/Unlike a Comment """
@app.route('/like-comment', methods=['POST', 'DELETE'])
def likeComment():
    if request.method=='POST':
        # Get last like id
        all_likes = Likes.query.all()
        if len(all_likes) > 0:
            last_like = all_likes[-1]
            new_like = Likes(last_like.id+1, request.json['comment_id'], 0, request.json['user_id'])
        else:
            new_like = Likes(301, request.json['comment_id'], 0, request.json['user_id'])
        db.session.add(new_like)
    elif request.method=='DELETE':
        # Get like
        old_like = Likes.query.filter_by(comment_numkey=request.json['comment_id'], user_id=request.json['user_id']).first()
        db.session.delete(old_like)
    
    db.session.commit()
    # Return updated number of likes
    likes = Likes.query.filter_by(comment_numkey=request.json['comment_id']).all()
    return str(len(likes))

# outside main because it doesnt load on Erick's computer
admin = Admin(app)
admin.add_view(UserView(Users, db.session))
admin.add_view(PostsView(Posts, db.session))
admin.add_view(CommentView(Comments, db.session))
admin.add_view(LikesView(Likes, db.session))
    # app.run(debug=True)
# Driver Code
if __name__ == '__main__':

# Admin
    # with app.app_context():
        #Login.__table__.drop(db.engine)
        # db.create_all()
    #     admin = Admin(app)
    #     admin.add_view(UserView(Users, db.session))
    #     admin.add_view(PostsView(Posts, db.session))
    #     admin.add_view(CommentView(Comments, db.session))
    #     admin.add_view(LikesView(Likes, db.session))
    app.run(debug=True)