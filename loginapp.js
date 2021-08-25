swal("Are you a member of the Indian Youth Club", {
    buttons: {
      cancel: "No",
      defeat: "Yes",
  },
})
.then((value) => {
  switch (value) {
 
    case "defeat":
      break;
 
    default:
      swal("Sorry ! Only the members of Indian Youth Club can login");
  }
});
var cnt = 3;
function formValidator(){
    var state = false;
    var un = document.loginForm.username.value;
    var pwd = document.loginForm.password.value;
    if((un == "iamakash_06")&&(pwd == "123456")){
        return true;
    }
    else{
        if(cnt == 0){
            swal({
                icon: "warning",
                text: "No Login Attempts Available"
              });              
        }
        else{
            cnt = cnt -1;
            swal({
                icon: "error",
                text: `Login Failed! ${cnt} more Attempts Available`
              });
            if(cnt == 0){
                document.loginForm.username.disabled = true;
                document.loginForm.password.disabled = true;
            }
        }
    }
    return false;
}