//set todo list variable
let isLoggedIn = false;
let todoList = JSON.parse(localStorage.getItem('todos'));
//Add todo
$(document).ready(function() {
    $('#page_login_submit').on('click', function() {
        try {
            getToken();
            //doLogin();
            let token = localStorage.getItem('token');
            let cookie = localStorage.getItem('session_name') + '=' + localStorage.getItem('sessid');
            let btoa = localStorage.getItem('btoa');
            $.ajax({
                url: "https://localhost/daybook_dev/dbk-api/daybook_activity_resource/10",
                // + encodeURIComponent(nid) + ".json",
                type: 'get',
                dataType: 'json',
                //data: credentials,
                // data: { '"username"': $("#page_login_name").val(), '"password"': $("#page_login_pass").val() },
                beforeSend: function(request) {
                    request.setRequestHeader('X-CSRF-Token', token);
                    // request.setRequestHeader("Cookie", cookie);
                    request.setRequestHeader("Authorization", "Basic " + btoa);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert('page_node_get - failed to retrieve node');
                    console.log(JSON.stringify(XMLHttpRequest));
                    console.log(JSON.stringify(textStatus));
                    console.log(JSON.stringify(errorThrown));
                },
                success: function(data) {
                    localStorage.setItem('todos', JSON.stringify(data));
                    let todoList = JSON.parse(localStorage.getItem('todos'));
                    let i = 0;
                    $.each(todoList, function(key, value) {
                        $('#todos').prepend('<li id="task-' + i + '"><a id="todo_link" href="#view" data-todo_site =' + value.activity_site + ' data-todo_date=' + value.activity_start + '> ' + value.activity_site + '<span>' + value.activity_start + '</span></a></li > ');
                        i++;
                    })
                    $.mobile.changePage("index.html", "slideup");
                }
            })
        } catch (error) { alert("page_node_get - " + error); }
        return false;
    });
    //set counter

    //check for todos
    /*
     if (localStorage.getItem('todos') != null) {
         //loop through and output li items
         $.each(todoList, function(key, value) {
                 $('#todos').prepend('<li id="task-' + i + '"><a id="todo_link" href="#view" data-todo_name =' + value.todo_name + ' data-todo_date=' + value.todo_date + '> ' + value.todo_name + '<span>' + value.todo_date + '</span></a></li > ');
                 i++
             })
             //Refresh
         $('#todos').listview('refresh');
     }
     $('#view_form').submit(function() {
         //Get submited values
         let todo_name = $('#todo_name').val();
         let todo_date = $('#todo_date').val();
         if (todo_name == '') {
             alert('');
         } else if (todo_date == '') {
             alert('Please add date');
         } else {
             let todos = JSON.parse(localStorage.getItem('todos'));
             //check todos
             if (todos == null) {
                 todos = [];
             }
             //create array with new todo
             let new_todo = {
                 "todo_name": todo_name,
                 "todo_date": todo_date
             };
             todos.push(new_todo);
             localStorage.setItem('todos', JSON.stringify(todos));
         }
     });

     //edit todo
     $('#edit_form').submit(function() {
         let currentTodoName = localStorage.getItem('currentTodoName');
         let currentTodoDate = localStorage.getItem('currentTodoDate');
         //loop through todos
         for (let i = 0; i < todoList.length; i++) {
             if (todoList[i].todo_name == currentTodoName) {
                 todoList.splice(i, 1);
             }
             localStorage.setItem('todos', JSON.stringify(todoList));
         }
         //Create new todo
         let todo_name_edit = $('todo_name_edit').val();
         let todo_date_edit = $('todo_date_edit').val();
         let todos = JSON.parse(localStorage.getItem('todos'));
         //Create array with new values
         var update_todo = {
             "todo_name": todo_name_edit,
             "todo_date": todo_date_edit
         }
         todos.push(update_todo);
         localStorage.setItem('todos', JSON.stringify(todos));
     });

     //Delete
     $('#edit_form').on('click', '#delete', function() {
         let currentTodoName = localStorage.getItem('currentTodoName').trim();
         let currentTodoDate = localStorage.getItem('currentTodoDate');
         //loop through todos
         for (let i = 0; i < todoList.length; i++) {
             if (todoList[i].todo_name == currentTodoName) {
                 todoList.splice(i, 1);
             }
             localStorage.setItem('todos', JSON.stringify(todoList));
         }
         //Close and go home
         $.mobile.changePage($('#home'), 'pop');
     });

     $('#todos').on('click', '#todo_link', function() {
         //let currentTodoName = $(this).data('todo_name').html();
         let value = $(this).html();
         let currentTodoName = "";
         for (var i = 0; i < value.length; i++) {
             if (value.charAt(i) == '<') { break; }
             currentTodoName += value.charAt(i);
         }
         // var str = $('#todo_name').val();
         localStorage.setItem('currentTodoName', currentTodoName);
         localStorage.setItem('currentTodoDate', $(this).data('todo_date'));
     });
     ///Isert edit data into edit form
     $(document).on('pageshow', '#edit', function() {
         let currentTodoName = localStorage.getItem('currentTodoName');
         let currentTodoDate = localStorage.getItem('currentTodoDate');
         $('#edit_form input[name=todo_name_edit]', this).val(currentTodoName);
         $('#edit_form input[name=todo_date_edit]', this).val(currentTodoDate);
     });

     $(document).on('pageshow', '#home', function() {
         window.location.reload();
     });
     //clear todos
     $('#clear_btn').click(function() {
         localStorage.clear();
     });

     Storage.prototype.setObject = function(key, value) {
         this.setItem(key, JSON.stringify(value));
     };

     Storage.prototype.getObject = function(key) {
         var value = this.getItem(key);
         return value && JSON.parse(value);
     };
     */
});


/*
$.ajax({
        url: localStorage.appurl+"/api/node/" + encodeURIComponent(nid) + ".json",
        type: 'put',
        data: "field_ftritem_images[und][0][fid]=250&field_ftritem_date_visited[und][0][value][date]=02/10/2015",
        dataType: 'json',
        headers: {
          'X-CSRF-Token': localStorage.usertoken
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
 
        },
        success: function (data) {
          
          console.log("We have updated the node ");
        }
      });


*/
function getToken() {
    // if (!isLoggedIn) {
    // Get a Token from the site
    $.ajax({
        url: 'https://localhost/daybook_dev/dbk-api/user/token',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        headers: {
            Accept: 'application/json',
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // Error getting Token
            console.log('Get Token Failed');
            console.log(JSON.stringify(XMLHttpRequest));
            console.log(JSON.stringify(textStatus));
            console.log(JSON.stringify(errorThrown));
        },
        success: function(data) {
            // Set the Token Value
            localStorage.setItem('token', JSON.stringify(data.token));
            doConnect();
        }

    }); // End Ajax
    //}
}

function doLogin() {
    var name = $('#page_login_name').val();
    if (!name) { alert('Please enter your user name.'); return false; }
    var pass = $('#page_login_pass').val();
    if (!pass) { alert('Please enter your password.'); return false; }
    // BEGIN: drupal services user login (warning: don't use https if you don't have ssl setup)
    let str = btoa(name + ":" + pass);
    var enc = window.btoa(str);
    localStorage.setItem('btoa', JSON.stringify(enc));
    let token = localStorage.getItem('token');

    // getToken();
    // doConnect();
    setTimeout(function() {
        //do what you need here
    }, 200);

    $.ajax({
        url: "https://localhost/daybook_dev/dbk-api/user/login",
        type: 'post',
        data: 'username=' + encodeURIComponent(name) + '&password=' + encodeURIComponent(pass),
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        crossDomain: true,
        beforeSend: function(request) {
            // request.setRequestHeader('X-CSRF-Token', token);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('page_login_submit - failed to login');
            console.log(JSON.stringify(XMLHttpRequest));
            console.log(JSON.stringify(textStatus));
            console.log(JSON.stringify(errorThrown));
        },
        success: function(data) {
            localStorage.setItem('sessid', JSON.stringify(data.sessid));
            localStorage.setItem('session_name', JSON.stringify(data.session_name));
            localStorage.setItem('token', JSON.stringify(data.token));
            localStorage.setItem('userid', JSON.stringify(data.user.uid));
            isLoggedIn = true;
            $.mobile.changePage("html/node_get.html", "slideup");
            //alert('ok');
        }
    });

}

function doConnect(tokenid) {
    let token = localStorage.getItem('token');
    $.ajax({
        url: "https://localhost/daybook_dev/dbk-api/system/connect",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        beforeSend: function(request) {
            request.setRequestHeader("X-CSRF-Token", token);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert( 'Error with Connect.json' );
            alert(gorge);
            console.log('Error with Connect.json');
            console.log(JSON.stringify(XMLHttpRequest));
            console.log(JSON.stringify(textStatus));
            console.log(JSON.stringify(errorThrown));

        },
        success: function(data) {
            // console.log(data);
            localStorage.setItem('sessid', JSON.stringify(data.sessid));
            localStorage.setItem('session_name', JSON.stringify(data.session_name));
            //localStorage.setItem('token', JSON.stringify(data.token));
            //localStorage.setItem('userid', JSON.stringify(data.user.uid));

            doLogin();
        }
    });
}


/*

    $('#add_form').submit(function() {
        //Get submited values
        let todo_name = $('#todo_name').val();
        let todo_date = $('#todo_date').val();
        if (todo_name == '') {
            alert('');
        } else if (todo_date == '') {
            alert('Please add date');
        } else {
            let todos = JSON.parse(localStorage.getItem('todos'));
            //check todos
            if (todos == null) {
                todos = [];
            }
            //create array with new todo
            let new_todo = {
                "todo_name": todo_name,
                "todo_date": todo_date
            };
            todos.push(new_todo);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    });

*/
// localStorage.setObject('apps', apps );

// var ourApps = localStorage.getObject('apps');

// $('#getdata').click(function(){
//     var name= "johns";
//     $.ajax({
//   url: '<?php base_url() ?>message/sam',
//   type:'POST',
//   data: "{name:'" + name + "'}",
//   contentType: "application/json",
//   dataType: 'json',
//   success: function(output_string){
//      $('#result_table').append(output_string);
//     } // End of success function of ajax form
//    }); // End of ajax call
// });