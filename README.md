
# this simple tasks mange system
  # veiw applaction working here
  https://tasksmanger.herokuapp.com/

# Applaction front build in react 

# comand to run it:

# open repo in termail 

# 'npm install'
# 'npm start'

# it will run at localhost:3000 
 # Here all apis:
 use base ulr with these apis
 # post apis
  "/login"
  "/logout"
  "/register"

 #  get apis
  "/tasks-to-do" 
  "/tasks-completed"
  "/task/:taskId"

#  post api
  "/add-task"

# patch
  "/mark/:taskId"

# delete
  "/delete/:taskId"

# post
  "/edit-name",
  "/change-password"

 # delete
  "/delete-account"

 # for admin
  # get
  "/admin/all-tasks"
  # patch
  "/admin/mark/:taskId"
  
  # delete
  "/admin/delete-task/:taskId"

 # get
  "/admin/all-users"

 # delete
  "/admin/delete-user/:userId"