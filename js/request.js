$.ajax({
    url: "http://10.0.1.83/",
    dataType: "jsonp",
    jsonpCallback:'json_response',
    type: "GET",
    crossDomain: true,
    jsonp: false,
    cache: true,
    async: true
})
    .success(function(data){
        for(var i = 0 ; i<data.Rows.length; i++)
        {
            window.localStorage.setItem("name" + i , data.Rows[i].name); //set local storage
            $('#rollnr tr:last').after('<tr> <td>' +  i
                + '</td> <td>' + window.localStorage.getItem("name" + i) +'</td>' ); //get local storage value

            //alert(window.localStorage.getItem("name" + i));

        }
        console.log(data);
    });