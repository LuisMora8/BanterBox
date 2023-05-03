from models import Users, Posts, Comments,Likes, app, db

def student_schedule():
    #delete database
    # db.drop_all()

    #delete row
    # me = Posts.query.filter_by(numkey = 102).first()
    # db.session.delete(me)
    # db.session.commit()

    #populate tables
    userAdd =  Users(10,'Erick Vargas','ErickVargas@gmail.com','pass123', "static/images/ryuk.jpeg")
    db.session.add(userAdd)
    db.session.commit()

    userAdd2 =  Users(20,'Able Getachew','AbleGetachew@gmail.com','pass456', "static/images/ryuk.jpeg")
    db.session.add(userAdd2)
    db.session.commit()

    userAdd3 =  Users(30,'Luis Mora','LuisMora@gmail.com','pass789', "static/images/ryuk.jpeg")
    db.session.add(userAdd3)
    db.session.commit()

    postAdd =  Posts(102,10,'Blinker Fluid', 'What is blinker fluid?', "static/images/post-pic.png")
    db.session.add(postAdd)
    db.session.commit()
    
    postAdd2 =  Posts(103,20,'For loops','What is a for loop and when do you use it?',"")
    db.session.add(postAdd2)
    db.session.commit()

    postAdd3 =  Posts(104,30,'C++ coding language','What is C++ and when should I use it?',"")
    db.session.add(postAdd3)
    db.session.commit()

    commentAdd =  Comments(203,20,102,'Blinker fluid is for blinker lights')
    db.session.add(commentAdd)
    db.session.commit()

    commentAdd2 =  Comments(204,30,103,'In simple terms, a for loop is a programming construct that allows you to repeat a set of instructions a certain number of times or iterate over a collection of elements.')
    db.session.add(commentAdd2)
    db.session.commit()

    commentAdd3 =  Comments(205,10,103,'C++ is a high-level programming language that is widely used for developing software applications, particularly in the fields of system programming, game development, and high-performance computing.')
    db.session.add(commentAdd3)
    db.session.commit()

    likesAdd =  Likes(303,203,0,10)
    db.session.add(likesAdd)
    db.session.commit()

    likesAdd2 =  Likes(304,0,102,20)
    db.session.add(likesAdd2)
    db.session.commit()

    likesAdd3 =  Likes(305,0,103,30)
    db.session.add(likesAdd3)
    db.session.commit()

    
    

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        student_schedule()
    app.run(debug=True)
    