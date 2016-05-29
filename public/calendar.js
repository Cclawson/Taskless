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
        success: function (reply) {}
    },
    eventClick: function (event) {
        var x;
        if (confirm("Are you sure you want to delete this assignment?") == true) {
            $.post("/removeassignment", {
                name: event.title,
                user: event.id
            });
            location.reload();
        }
    }
});