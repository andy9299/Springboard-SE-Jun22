- BUG #1:
  Missing await in post /login route of auth.

- BUG #2:  
  Update user function in the model class when updating nothing crashes

- BUG #3:  
  (Security Issue)  
  Changed decode to verify  
  Could theoretically fake a token since there was no verification

- BUG #4:  
  get /users was not returning basic info

  BUG #5:
  Missing await in delete /users/:username route

- BUG #6:
  Able to update fields such as password in patch /user/:username

- BUG #7:
  When registering with missing data crashes

  I assumed that the data that could be sent to a route is valid.
