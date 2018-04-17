import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';

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
    console.log("URL EXT = ", this.props.urlExt)
  }

  componentWillMount(){
    if (this.state.repeatLoading){
      this.fetchCalendarData(this, this.props.urlExt);
    }
  }

  render() {
    console.log("rendering...");
    if (this.state.render){
        var myThis = this;
        return (
              <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems(myThis.events)}
                selected={'2018-04-16'}
                // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                // maxDate={'2012-05-30'}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                // pastScrollRange={0}
                // futureScrollRange={0}
                // onDayChange={console.log('day changed')}
              />
            );
    }
    return null;
  }


  fetchCalendarData(myThis, urlExt){
    console.log("Still fetching...");
    fetch('https://pickapp-test.herokuapp.com/api/calendar/' + urlExt)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log("myJson = ", myJson);
        var date, startTime, endTime, eventTitle, court;
        myThis.events = myJson.map((event) => {
            event = event.split(" - ");
            event[0] = (event[0].replace("T", "X")).split("X");
            date = event[0][0];
            startTime = event[0][1].split("-")[0];
            endTime = ((event[1].replace("T", "X")).split("X"))[1].split('-')[0];
            eventTitle = event[2];
            // console.log("event = ", event);
            if (event.length === 4){ court = event[3]; } 
            else { 
              eventTitle = event[2].split("-")[0]; 
              if (event[2].split("-")[1] !== undefined ) { court = event[2].split("-")[1]; }
              // console.log("COURT = ", court); console.log("eventTitle = ", eventTitle);
              // if (event.length === 3){ eventTitle = }
            }
            // console.log("YARRAK");
            
            // console.log("eventTitle = ", eventTitle);

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
            
            // console.log("AMJIK");
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


  loadItems(events) {
    // console.log("events = ", events)
    // setTimeout(() => {
      if (this.state.repeatLoading){
        // console.log("LOADING");
        this.state.items = []
        for (let i = 0; i < events.length; i++) {
          var strTime = events[i].date;
          // console.log("strTime = ", strTime);
          // console.log("indexOneLess = ", indexOneLess);
          // strTime = strTime.substring(0, strTime.length - 2) + indexOneLess;
          // console.log("strTime after = ", strTime);
          var indexOneLess = strTime.substring(0, strTime.length - 2) + (parseInt(strTime.substring(strTime.length - 2, strTime.length)) - 1).toString();
          // console.log("indexOneLess = ", indexOneLess);
          if (!this.state.items[indexOneLess]) { this.state.items[indexOneLess] = []; }
          this.state.items[indexOneLess].push({
            index: indexOneLess,
            date: events[i].date,
            startTime: events[i].startTime.substring(0, 5),
            endTime: events[i].endTime.substring(0, 5),
            eventTitle: events[i].eventTitle,
            courts: events[i].courts,
            height: ((parseInt(events[i].endTime.substring(0, 3)) * 60 + parseInt(events[i].endTime.substring(3, 5))) - (parseInt(events[i].startTime.substring(0, 3)) * 60 + parseInt(events[i].startTime.substring(3, 5)))) / 60,
          });
        }
        
          const newItems = {};
          Object.keys(this.state.items).forEach(key => {
            // console.log("KEY = ", key)
            var indexOneLess = key.substring(0, key.length - 2) + (parseInt(key.substring(key.length - 2, key.length)) - 1).toString();
            newItems[indexOneLess] = this.state.items[indexOneLess];
            // console.log("key = ", key, ", indexOneLess = ", indexOneLess, ", newItems[indexOneLess] = ", newItems[indexOneLess]);
          });
          this.setState({
            items: newItems,
            repeatLoading: false,
          }); 
      }
      
    // }, 1000);
  }

  renderItem(item) {
    console.log("this.state.items = ", this.state.items);
    var toRender = [];
    var court_1 = []; var court_2 = []; var court_3 = []; var court_4 = [];
    // console.log("item.index = ", item.index, ", item.index+1 = ", item.index.substring(0, item.index.length - 2) + (parseInt(item.index.substring(item.index.length - 2, item.index.length)) + 1).toString());
    // console.log("this.state.items = ", this.state.items[item.index]);
    // console.log("initial length = ", this.currDay.length);
    // console.log("item to be rendered = ", item);
    if (this.currDay.length === 0){
      // console.log("this.currentDay.length === 0 ", this.currDay.length);
      // console.log("item gonna be pushed ", item, " , this.currentDay = ", this.currDay);
      this.currDay.push(item);
    } else {
      // console.log("this.currentDay.length !== 0 ", this.currDay.length);
      // console.log("this.currentDay[0] =  ", this.currDay[0]);
      if (this.currDay[0].date !== item.date){
        if (this.currDay[0].courts === undefined){
          court_1 = court_2 = court_3 = court_4 = null;
          // console.log("court_1 = ", court_1, ", court_2 = ", court_2, ", court_3 = ", court_3, ", court_4 = ", court_4);
          var i = 0;
          var toRender = this.currDay.map((event) => {
            i++;
            return(
              <View style={styles.item_nelson} key={i}>
                <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{event.eventTitle}</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {event.startTime}</Text></Text>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {event.endTime}</Text></Text>
              </View>

            );
          });
        } else {
          for (var i = 0; i < this.currDay.length; i++){
            if (this.currDay[i].courts.includes(1)){
              court_1.push(
                <View style={styles.item_omac} key={i}>
                  <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{this.currDay[i].eventTitle}</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].startTime}</Text></Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].endTime}</Text></Text>
                </View>
              );
            }
            if (this.currDay[i].courts.includes(2)){
              court_2.push(
                <View style={styles.item_omac} key={i}>
                  <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{this.currDay[i].eventTitle}</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].startTime}</Text></Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].endTime}</Text></Text>
                </View>
              );
            } 
            if (this.currDay[i].courts.includes(3)){
              court_3.push(
                <View style={styles.item_omac} key={i}>
                  <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{this.currDay[i].eventTitle}</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].startTime}</Text></Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].endTime}</Text></Text>
                </View>
              );
            } 
            if (this.currDay[i].courts.includes(4)){
              court_4.push(
                <View style={styles.item_omac} key={i}>
                  <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{this.currDay[i].eventTitle}</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].startTime}</Text></Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].endTime}</Text></Text>
                </View>
              );
            }
          }
        }
        this.currDay.length = 0;
      } 
      this.currDay.push(item);
    }
     
    if (court_1 !== null){
      var sum_len = court_1.length + court_2.length + court_3.length + court_4.length;
      if (sum_len === 0){
        return null
      }
      if (court_1.length === 0){ court_1.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
      if (court_2.length === 0){ court_2.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
      if (court_3.length === 0){ court_3.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
      if (court_4.length === 0){ court_4.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
      return (
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
      );
    } else {
      return (
        <View style={{marginTop: 30}}>
          {toRender}
        </View>
      );
    }
    

    
  }

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
    width: 70,
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    borderRadius: 5,
    padding: 2,
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
    height: 300,
    flexDirection: 'row',
    justifyContent:'space-between', 
    alignSelf: 'flex-start',
    backgroundColor: 'green',
    marginRight: 10, 
    marginTop: 35,
    alignSelf: 'stretch',
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
