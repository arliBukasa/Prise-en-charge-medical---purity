import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

export default function CalendarExample() {
  const calendarDataCalendar = [
    {
      title: "All day conference",

      borderColor: "transparent",
      start: "2021-10-01",
      end: "2021-10-01",
      backgroundColor: "#68D391",
      className: "success"
    },

    {
      title: "Meeting with Mary",

      borderColor: "transparent",
      start: "2021-10-03",
      end: "2021-10-03",
      backgroundColor: "#F6AD55",
      className: "info"
    },

    {
      title: "Cyber Week",

      borderColor: "transparent",
      start: "2021-10-04",
      end: "2021-10-04",
      backgroundColor: "#805AD5",
      className: "warning"
    },

    {
      title: "Winter Hackaton",

      borderColor: "transparent",
      start: "2021-10-05",
      end: "2021-10-05",
      backgroundColor: "#0BC5EA",
      className: "error"
    },

    {
      title: "Digital event",

      borderColor: "transparent",
      start: "2021-10-09",
      end: "2021-10-11",
      backgroundColor: "#4FD1C5",
      className: "warning"
    },

    {
      title: "Dinner with Family",

      borderColor: "transparent",
      start: "2021-10-21",
      end: "2021-10-21",
      backgroundColor: "#F6AD55",
      className: "error"
    },

    {
      title: "Black Friday",

      borderColor: "transparent",
      start: "2021-10-25",
      end: "2021-10-25",
      backgroundColor: "#0BC5EA",
      className: "info"
    }
  ];
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={false}
        initialView="dayGridMonth"
        contentHeight="600"
        events={calendarDataCalendar}
        editable={true}
        minHeight="400px"
        height="400px"
        slotWidth={10}
        customIcons={false}
      />
    </div>
  );
}
