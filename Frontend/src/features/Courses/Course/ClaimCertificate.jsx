import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Logo from "../../../assets/images/ulogo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  text: {
    padding: "20px",
    fontSize: "20px",
  },
  title: {
    padding: "20px",
    fontSize: "50px",
    fontWeight: "bold",
  },
  name: {
    marginTop: "100px",
    padding: "20px",
    fontSize: "40px",
    fontWeight: "bold",
  },
});

// Create Document Component
// eslint-disable-next-line react/prop-types
function PDF({ userName, courseName }) {
  return (
    <Document className="">
      <Page size="A3" className="font-bold" wrap>
        <View>
          <Image src={Logo} style={{ width: "400px", alignSelf: "center" }} />
          <Text style={styles.text}> Fake Certificate of Completion</Text>
        </View>
        <View>
          <Text style={styles.title}>{courseName}</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>
      </Page>
    </Document>
  );
}

// eslint-disable-next-line react/prop-types
export default function ClaimCertificate({ courseName, userName }) {
  return (
    <div>
      <PDFDownloadLink
        document={<PDF userName={userName} courseName={courseName} />}
        fileName="certificate.pdf"
        style={{ width: "full" }}
        className="bg-purple-700 text-white font-bold p-2  text-center mt-4 mb-2  text-lg block"
      >
        {/*eslint-disable-next-line no-unused-vars*/}
        {({ blob, url, loading, error }) =>
          loading ? "Loading Certificate..." : "Claim Certificate!"
        }
      </PDFDownloadLink>
    </div>
  );
}
