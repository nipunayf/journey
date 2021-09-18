import * as React from 'react';
import {View, StyleSheet, ScrollView, FlatList,Text} from 'react-native';
import CardComponent from '../Components/card';
import StepIndicator from 'react-native-step-indicator';
import dummyData from './data';
import Swiper from 'react-native-swiper';


const ItineraryScreen = props => {
  const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#0277bd',
    separatorFinishedColor: '#0277bd',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#0277bd',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 15,
    currentStepLabelColor: '#0277bd',
  };
  
  const [currentPage, setCurrentPage] = React.useState(0);
  const viewabilityConfig = React.useRef({ itemVisiblePercentThreshold: 40 }).current;

  const renderPage = (rowData) => {
    const item = rowData.item;
    return (
      <View style={styles.rowItem}>
        <CardComponent title= {item.title}
        url= {item.url}
        content= {item.content}
        Atime= {item.Atime}
        Dtime= {item.Dtime}/>
      </View>
    );
  };

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    const visibleItemsCount = viewableItems.length;
    if (visibleItemsCount !== 0) {
      setCurrentPage(viewableItems[visibleItemsCount - 1].index);
    }
  }, []);
  
  
  return (
    <View style={{flex:1}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Travel Itinerary</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator
          customStyles={stepIndicatorStyles}
          stepCount={4}
          direction="vertical"
          currentPosition={currentPage}
          //labels={dummyData.data.map((item) => item.title)}
        />
        </View>
        <View >
          <FlatList
          style={{ flexGrow: 1 }}
          data={dummyData.data}
          renderItem={renderPage}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 50,
    paddingHorizontal: 20,
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    height: 60,
    paddingTop: 20,
    backgroundColor: '#0277bd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
  },
});
export default ItineraryScreen;
