import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import {Agenda} from 'react-native-calendars';
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class FacilityCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      render: false,
      repeatLoading: true,
    };
    this.events = [];
    this.currDay = [];
    this.idx = 0;
    this.nested_idx = 0;
  }

  componentWillMount(){
    if (this.state.repeatLoading){
      this.fetchCalendarData(this, this.props.urlExt);
    }
  }

  adjustTimeZoneInISOString(date){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, -1);
    return localISOTime
  }

  adjustTimeZoneInDate(date){
    return new Date(date.getTime() + (date.getTimezoneOffset() * 60000))
  }

  render() {
    var curr = new Date();
    var currString = this.adjustTimeZoneInISOString(curr).split("T")[0]
    var maxDate = this.adjustTimeZoneInISOString(new Date("2018-05-13")).split("T")[0];
    if (this.state.render){
        var myThis = this;
        return (
              <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this, curr)}
                selected={currString}
                minDate={currString}
                maxDate={maxDate}
                renderItem={this.renderItem.bind(this)}
                renderDay={(day, item) => {return (<View/>);}}
                rowHasChanged={this.rowHasChanged.bind(this)}
              />
            );
    }
    return null;
  }

  time(date) {
    var date = new Date(date);
    var hours = date.getHours() + 4;
    var minutes = date.getMinutes();
    var ampm = hours >= 12 && hours < 24 ? 'pm' : 'am';
    var strMin = (minutes < 10) ? (minutes === 0 ? "": "0" + minutes): minutes;
    var strTime = (hours === 12 && minutes === 0) ? "noon": (hours === 24 && minutes === 0) ? "midnight": ((hours % 12) + (strMin == "" ? '': ':') + strMin + ampm); // the hour '0' should be '12'
    return strTime;
  }


  fetchCalendarData(myThis, urlExt){
    var myThis = this;
    fetch('https://pickapp-test.herokuapp.com/api/calendar/' + urlExt)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        var date, startTime, endTime, eventTitle, court;
        myThis.events = myJson.map((event) => {
            event = event.split(" - ");
            startTime = myThis.time(event[0].substring(0, 19));
            endTime = myThis.time(event[1].substring(0, 19));
            date = event[0].split("T")[0]
            var event_params = event[1].substring(26, event[1].length).split("-");
            eventTitle = event_params[0];
            court = event_params[1].split(","); 
            if (court !== undefined){
              var courts = [];
              if (court.includes('1')){ courts.push(1); } 
              if (court.includes('2')){ courts.push(2); } 
              if (court.includes('3')){ courts.push(3); } 
              if (court.includes('4')){ courts.push(4); }
              if (courts.length == 0){
                if (court.includes('ower')){
                  courts.push(1);
                  courts.push(2);
                  courts.push(3);
                  courts.push(4);
                } else if (court.includes('olleyball')){
                  courts.push(4)
                }
              }
            }
            return(
                {
                   date: date,
                   startTime: startTime,
                   endTime: endTime,
                   eventTitle: eventTitle,
                   courts: courts
                }
            );
        });
        myThis.setState({
            render: true,
        });
    });
  }


  loadItems(day) {
    console.log("day = ", day)
    this.state.items = [];
    var strTime = this.adjustTimeZoneInISOString(new Date()).split("T")[0]
    // console.log("this.state.items[strTime] = ", this.state.items[strTime])
    if (!this.state.items[strTime]) {  this.state.items[strTime] = []; }
    if (strTime != this.adjustTimeZoneInISOString(day).split("T")[0]) {
    console.log("ANNENIN AMI") 
      this.state.items[strTime].push({
        index: 0,
        date: strTime,
        startTime: "9am",
        endTime: "10am",
        eventTitle: "ANNENIN AMI",
        courts: [1,2],
        height: 10,
      });
    }
    // strTime = this.adjustTimeZoneInISOString(this.adjustTimeZoneInDate(new Date(new Date(strTime).getTime() + 24 * 60 * 60 * 1000))).split("T")[0]
    // console.log("strTime update = ", strTime)
      if (this.state.repeatLoading){
        var idx = 0;
        for (let i = 0; i < this.events.length; i++) {
          strTime = this.events[i].date;
          if (!this.state.items[strTime]) { this.state.items[strTime] = []; }
          console.log("this.events[i] = ", this.events[i])
          this.state.items[strTime].push({
            index: idx,
            date: this.events[i].date,
            startTime: this.events[i].startTime,
            endTime: this.events[i].endTime,
            eventTitle: this.events[i].eventTitle,
            courts: this.events[i].courts,
            height: ((parseInt(this.events[i].endTime.substring(0, 3)) * 60 + parseInt(this.events[i].endTime.substring(3, 5))) - (parseInt(this.events[i].startTime.substring(0, 3)) * 60 + parseInt(this.events[i].startTime.substring(3, 5)))) / 60,
          });
          if (this.events[i + 1] === undefined){
            idx = 0
          } else if (strTime !== this.events[i + 1].date){
            idx = 0
          } else { idx++; }
          // strTime = this.adjustTimeZoneInISOString(this.adjustTimeZoneInDate(new Date(new Date(strTime).getTime() + 24 * 60 * 60 * 1000))).split("T")[0]
        }
          const newItems = {};
          Object.keys(this.state.items).forEach(key => {
            newItems[key] = this.state.items[key];
          });
          this.setState({
            items: newItems,
            repeatLoading: false,
          }); 
      }
  }

  getNextEvent(myThis, nested_idx, idx){
    var curr_idx_date = new Date(this.idx).getTime();
    var next_idx = new Date(curr_idx_date + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    if (nested_idx === myThis.state.items[idx].length){
      nested_idx = 0;
      idx = next_idx;
    } else {
      nested_idx++;
    }
    if (myThis.state.items[idx][nested_idx] === undefined) { return { date: null } }    
    return myThis.state.items[idx][nested_idx];
  }


  renderItem(item) {
    // console.log("annen")
    if (this.idx === 0) {
      this.idx = this.adjustTimeZoneInISOString(new Date()).split("T")[0];
    }
    var lastKey = Object.keys(this.state.items).reverse()[0];
    if (lastKey === undefined){
      return
    }
    var lastValue = this.state.items[lastKey];
    // console.log("lastValue = ", lastValue)
    if (lastValue.length){
      // console.log("SICIS")
      if (this.adjustTimeZoneInDate(new Date(lastValue[0].date)).getTime() < this.adjustTimeZoneInDate(new Date(this.idx)).getTime()){
        return;
      }
    }
    item = this.state.items[this.idx]
    var curr = this.adjustTimeZoneInDate(new Date(this.idx));
    var court_1 = []; var court_2 = []; var court_3 = []; var court_4 = [];
    if (item === undefined) {
      item = []
    }
    for (var i = 0; i < item.length; i++){
      if (item[i].courts.includes(1)){
        court_1.push(
          <View style={styles.item_omac} key={i}>
            <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
            <Text style={{fontWeight: 'normal', fontSize: 12}}> {item[i].startTime} - {item[i].endTime}</Text>
          </View>
        );
      }
            if (item[i].courts.includes(2)){
              court_2.push(
                <View style={styles.item_omac} key={i}>
                  <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                  <Text style={{fontWeight: 'normal', fontSize: 12}}> {item[i].startTime} - {item[i].endTime}</Text>
                </View>
              );
            } 
            if (item[i].courts.includes(3)){
              court_3.push(
                <View style={styles.item_omac} key={i}>
                  <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                  <Text style={{fontWeight: 'normal', fontSize: 12}}> {item[i].startTime} - {item[i].endTime}</Text>
                </View>
              );
            } 
            if (item[i].courts.includes(4)){
              court_4.push(
                <View style={styles.item_omac} key={i}>
                  <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                  <Text style={{fontWeight: 'normal', fontSize: 12}}> {item[i].startTime} - {item[i].endTime}</Text>
                </View>
              );
            }
          }
      var sum_len = court_1.length + court_2.length + court_3.length + court_4.length;
      var toRender;
      if (sum_len === 0 || item[0].eventTitle === "ANNENIN AMI"){
        if (sum_len === 0){
          var i = 0
          toRender = item.map((event) => {
            i++;
            return(
                <View style={styles.item_nelson} key={i}>
                  <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{event.eventTitle}</Text>
                  <Text style={{fontWeight: 'normal', fontSize: 12}}> {event.startTime} - {event.endTime}</Text>
                </View>
            );
          });
        } else if (item.length){
          var i = 0
          toRender = item.map((event) => {
            i++;
            return(
                <View style={styles.item_nelson} key={i}>
                  <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>No Upcoming Events</Text>
                </View>
            );
          });
        } 
        var curr = this.adjustTimeZoneInDate(new Date(this.idx));
        this.idx = this.adjustTimeZoneInISOString(new Date(curr.getTime() + 24 * 60 * 60 * 1000)).split("T")[0];
        var day = curr.getDate();
        var month = curr.getMonth();
        return (
          <View style={{marginTop: 0}}>
            <View style={{paddingLeft: 10, marginTop: 10, marginBottom: 5, display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start'}}>
              <Text style={{marginLeft: 5, fontSize: 30, textAlign: 'left', opacity: .8, alignSelf: 'flex-start'}}>{day}</Text>
              <Text style={{marginLeft: 2, marginTop: 5, fontSize: 15, textAlign: 'left', opacity: .7, alignSelf: 'flex-start'}}>{months[month]}</Text>
            </View>
            {toRender}
          </View>
        );
      }
      if (court_1.length === 0){ court_1.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
      if (court_2.length === 0){ court_2.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
      if (court_3.length === 0){ court_3.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
      if (court_4.length === 0){ court_4.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
      var curr = this.adjustTimeZoneInDate(new Date(this.idx));
      var day = curr.getDate();
      var month = curr.getMonth();
      this.idx = this.adjustTimeZoneInISOString(new Date(curr.getTime() + 24 * 60 * 60 * 1000)).split("T")[0];
      return (
        <View>
          <View style={{paddingLeft: 10, marginTop: 10, marginBottom: 5, display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start'}}>
            <Text style={{marginLeft: 5, fontSize: 30, textAlign: 'left', opacity: .8, alignSelf: 'flex-start'}}>{day}</Text>
            <Text style={{marginLeft: 2, marginTop: 5, fontSize: 15, textAlign: 'left', opacity: .7, alignSelf: 'flex-start'}}>{months[month]}</Text>
          </View>
          <View style={styles.dayContainer}>
            <View style={styles.basketballCourt}>
              <Text style={styles.columnTitleContainer}>Court 1</Text>
              <View style={styles.dayEventsContainer}>
                {court_1}
              </View>
            </View>
            <View style={styles.basketballCourt}>
              <Text style={styles.columnTitleContainer}>Court 2</Text>
              <View style={styles.dayEventsContainer}>
                {court_2}
              </View>
            </View>
            <View style={styles.basketballCourt}>
              <Text style={styles.columnTitleContainer}>Court 3</Text>
              <View style={styles.dayEventsContainer}>
                {court_3}
              </View>
            </View>
            <View style={styles.basketballCourt}>
              <Text style={styles.columnTitleContainer}>Court 4</Text>
              <View style={styles.dayEventsContainer}>
                {court_4}
              </View>
            </View>
          </View>
        </View>
      );

  }

  // renderItem(item) {
  //   console.log("item = ", item)
  //   if (this.idx === 0) {
  //     this.idx = new Date(new Date().getTime() - 4 * 60 * 60 * 1000).toISOString().split("T")[0];
  //   }
  //   // console.log("this.idx = ", this.idx);
  //   // console.log("this.state.items = ", this.state.items)
  //   var lastKey = Object.keys(this.state.items).reverse()[0];
  //   if (lastKey === undefined){
  //     return
  //   }
  //   // console.log("lastKey = ", lastKey)
  //   var lastValue = this.state.items[lastKey];
  //   // console.log("LAST = ", lastValue);

  //   // console.log(this.state.items);
  //   // console.log("new Date(lastValue.date).getTime() = ", new Date(lastValue[0].date).getTime(), ", new Date(this.idx).getTime() = ", new Date(this.idx).getTime())
  //   if (new Date(lastValue[0].date).getTime() < new Date(this.idx).getTime()){
  //     return;
  //   }
  //   // console.log("this.idx = ", this.idx)
  //   item = this.state.items[this.idx]
  //   // console.log("item = ", item)
  //   var curr = new Date(this.idx);
  //   var court_1 = []; var court_2 = []; var court_3 = []; var court_4 = [];
  //         for (var i = 0; i < item.length; i++){
  //           if (item[i].courts.includes(1)){
  //             court_1.push(
  //               <View style={styles.item_omac} key={i}>
  //                 <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
  //                 <Text style={{fontWeight: 'normal', fontSize: 12}}> {item[i].startTime} - {item[i].endTime}</Text>
  //               </View>
  //             );
  //           }
  //           if (item[i].courts.includes(2)){
  //             court_2.push(
  //               <View style={styles.item_omac} key={i}>
  //                 <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
  //                 <Text style={{fontWeight: 'normal', fontSize: 12}}> {item[i].startTime} - {item[i].endTime}</Text>
  //               </View>
  //             );
  //           } 
  //           if (item[i].courts.includes(3)){
  //             court_3.push(
  //               <View style={styles.item_omac} key={i}>
  //                 <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
  //                 <Text style={{fontWeight: 'normal', fontSize: 12}}> {item[i].startTime} - {item[i].endTime}</Text>
  //               </View>
  //             );
  //           } 
  //           if (item[i].courts.includes(4)){
  //             court_4.push(
  //               <View style={styles.item_omac} key={i}>
  //                 <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
  //                 <Text style={{fontWeight: 'normal', fontSize: 12}}> {item[i].startTime} - {item[i].endTime}</Text>
  //               </View>
  //             );
  //           }
  //         }
  //     var sum_len = court_1.length + court_2.length + court_3.length + court_4.length;
  //     var toRender;
  //     console.log("item[0].eventTitle = ", item[0].eventTitle)
  //     if (sum_len === 0 || item[0].eventTitle === "ANNENIN AMI"){
  //       if (item[0].eventTitle === "ANNENIN AMI"){
  //         var i = 0
  //         toRender = item.map((event) => {
  //           i++;
  //           return(
  //               <View style={styles.item_nelson} key={i}>
  //                 <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>No Upcoming Events</Text>
  //               </View>
  //           );
  //         });
  //       } else {
  //         var i = 0
  //         toRender = item.map((event) => {
  //           i++;
  //           return(
  //               <View style={styles.item_nelson} key={i}>
  //                 <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{event.eventTitle}</Text>
  //                 <Text style={{fontWeight: 'normal', fontSize: 12}}> {event.startTime} - {event.endTime}</Text>
  //               </View>
  //           );
  //         });
  //       }
  //       this.idx = new Date(curr.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  //       var curr = new Date(item[0].date + "T12:00:00");
  //       var day = curr.getDate();
  //       var month = curr.getMonth();
  //       return (
  //         <View style={{marginTop: 0}}>
  //           <View style={{paddingLeft: 10, marginTop: 10, marginBottom: 5, display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start'}}>
  //             <Text style={{marginLeft: 5, fontSize: 30, textAlign: 'left', opacity: .8, alignSelf: 'flex-start'}}>{day}</Text>
  //             <Text style={{marginLeft: 2, marginTop: 5, fontSize: 15, textAlign: 'left', opacity: .7, alignSelf: 'flex-start'}}>{months[month]}</Text>
  //           </View>
  //           {toRender}
  //         </View>
  //       );
  //     }
  //     if (court_1.length === 0){ court_1.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
  //     if (court_2.length === 0){ court_2.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
  //     if (court_3.length === 0){ court_3.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
  //     if (court_4.length === 0){ court_4.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
  //     var curr = new Date(item[0].date + "T12:00:00");
  //     var day = curr.getDate();
  //     var month = curr.getMonth();
  //     console.log("idx = ", this.idx)
  //     this.idx = new Date(curr.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  //     return (
  //       <View>
  //         <View style={{paddingLeft: 10, marginTop: 10, marginBottom: 5, display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start'}}>
  //           <Text style={{marginLeft: 5, fontSize: 30, textAlign: 'left', opacity: .8, alignSelf: 'flex-start'}}>{day}</Text>
  //           <Text style={{marginLeft: 2, marginTop: 5, fontSize: 15, textAlign: 'left', opacity: .7, alignSelf: 'flex-start'}}>{months[month]}</Text>
  //         </View>
  //         <View style={styles.dayContainer}>
  //           <View style={styles.basketballCourt}>
  //             <Text style={styles.columnTitleContainer}>Court 1</Text>
  //             <View style={styles.dayEventsContainer}>
  //               {court_1}
  //             </View>
  //           </View>
  //           <View style={styles.basketballCourt}>
  //             <Text style={styles.columnTitleContainer}>Court 2</Text>
  //             <View style={styles.dayEventsContainer}>
  //               {court_2}
  //             </View>
  //           </View>
  //           <View style={styles.basketballCourt}>
  //             <Text style={styles.columnTitleContainer}>Court 3</Text>
  //             <View style={styles.dayEventsContainer}>
  //               {court_3}
  //             </View>
  //           </View>
  //           <View style={styles.basketballCourt}>
  //             <Text style={styles.columnTitleContainer}>Court 4</Text>
  //             <View style={styles.dayEventsContainer}>
  //               {court_4}
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     );

  // }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return false;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item_omac: {
    backgroundColor: 'white',
    width: 80,
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  item_nelson: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 5,
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30,
  },
  basketballCourt: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dayContainer: {
    // position: 'absolute',
    // top: -50,
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between', 
    alignSelf: 'flex-start',
    backgroundColor: 'green',
    // marginRight: 10, 
    marginTop: 10,
    alignSelf: 'stretch',
    marginBottom: 100,
  },
  columnTitleContainer: {
    fontSize: 20,
    marginBottom: 10,
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'blue',
    top: 0,
  },
  dayEventsContainer: {
    backgroundColor: 'grey',
    marginTop: 40,
  }
});
