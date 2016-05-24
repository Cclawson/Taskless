$("#calendar").fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    weekends: true,
    editable: false,
    weekMode: 'liquid',
    events: {
        url: "/events",
        type: 'GET',
        dataType: 'json',
        success: function (reply) {
            console.log(reply);
        }
    },
    eventClick: function (event) {
        console.log(event.id);
        console.log(event.title);

        $.post("/removeassignment", {
            name: event.title,
            user: event.id
        });
        location.reload();
    }
});