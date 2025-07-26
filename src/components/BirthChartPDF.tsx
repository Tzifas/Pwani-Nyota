import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#1a365d',
    padding: 30,
    color: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: '#2d4a7c',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  stoneCard: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3d5a8c',
    borderRadius: 5,
  },
});

interface BirthChartPDFProps {
  birthChart: any;
  dailyPractice: any;
  recommendedStones: any[];
}

export const BirthChartPDF = ({ birthChart, dailyPractice, recommendedStones }: BirthChartPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>PwaniNyota Birth Chart</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Birth Chart</Text>
        <Text style={styles.text}>Sun Sign: {birthChart.sunSign}</Text>
        <Text style={styles.text}>Moon Sign: {birthChart.moonSign}</Text>
        <Text style={styles.text}>Rising Sign: {birthChart.risingSign}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Practice</Text>
        <Text style={styles.text}>{dailyPractice.practice}</Text>
        <Text style={styles.text}>{dailyPractice.coastalConnection}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Spiritual Stones</Text>
        {recommendedStones.map((stone) => (
          <View key={stone.name} style={styles.stoneCard}>
            <Text style={styles.text}>{stone.name}</Text>
            <Text style={styles.text}>{stone.description}</Text>
            <Text style={styles.text}>{stone.coastalImagery}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
); 