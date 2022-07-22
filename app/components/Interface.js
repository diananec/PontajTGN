import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  AppRegistry,
} from "react-native";
import Email, { sendEmail } from "../components/Email";
import RNSmtpMailer from "react-native-smtp-mailer";
import { CheckBox } from "react-native-elements/";

export default function Interface() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hours = new Date().getHours();
  var min = new Date().getMinutes();
  var seconds = new Date().getSeconds();

  const dataSiOra =
    date + "/" + month + "/" + year + "  " + hours + ":" + min + ":" + seconds;

  const emailOptions = {
    to: "email@yahoo.com",
    subject: numeProiect,
    body: nume,
  };

  let TrimitereEmail = () => {
    RNSmtpMailer.sendMail({
      mailhost: "smtp.gmail.com",
      port: 465,
      ssl: true,
      username: "pontajtgn@gmail.com",
      password: "pontajtgn2021",
      recipients: "pontajtgn@gmail.com",
      subject: numeProiect,
      htmlBody:
        "<h1>" +
        nume +
        "</h1><br><h2>" +
        numeProiect +
        "</h2><br><h3>" +
        dataSiOra +
        "</h3>",
    })
      .then((success) => {
        console.log("Mail sent successfully", success);
      })
      .catch((error) => {
        console.log("ERROR!", error);
      });
  };

  const ValidareText = () => {
    if (nume.trim().length < 3) {
      Alert.alert("Alert", "Numele trebuie sa contina minimum 3 caractere");
      return;
    } else if (numeProiect.trim().length < 4) {
      Alert.alert(
        "Alert",
        "Numele proiectului trebuie sa contina minimum 4 caractere"
      );
      return;
    } else {
      //TrimitereEmail();
      sendEmail(
        "pontajtgn@gmail.com",
        numeProiect,
        "Numele Angajatului: " +
          nume +
          "\n" +
          "Numele Proiectului: " +
          numeProiect +
          "\n" +
          "Data si Ora: " +
          dataSiOra
      );
    }
  };

  const [nume, setNume] = React.useState("");
  const [numeProiect, setNumeProiect] = React.useState("");
  const [InceputProiect, setInceputProiect] = React.useState(false);
  const [FinalProiect, setFinalProiect] = React.useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Logo_Transgaz_PNG.png")}
        style={{ width: 350, height: 100, marginTop: 60, resizeMode: "cover" }}
      />
      <View style={styles.introducere}>
        <Text style={styles.Text}>Introduceti Numele DVS.</Text>
        <TextInput
          style={{
            borderRadius: 20,
            borderColor: "blue",
            marginTop: 15,
            borderWidth: 1,
            width: 200,
            textAlign: "center",
          }}
          placeholder="ex: Ion Mihai"
          onChangeText={(text) => setNume(text)}
        ></TextInput>
        <Text style={styles.Text}>Introduceti Titlul Proiectului</Text>
        <TextInput
          style={{
            borderRadius: 20,
            borderColor: "blue",
            marginTop: 15,
            borderWidth: 1,
            width: 200,
            textAlign: "center",
          }}
          placeholder="ex: Dezvoltare Telnet"
          onChangeText={(text) => setNumeProiect(text)}
        ></TextInput>
        <View style={styles.checkBoxView}>
          <CheckBox
            center
            title="Incepere program"
            onPress={() => {
              if (InceputProiect === false && FinalProiect === false) {
                setInceputProiect(true);
              } else if (FinalProiect === true) {
                //alert("Poti selecta o singura optiune");
                setFinalProiect(false);
                setInceputProiect(true);
              } else setInceputProiect(false);
            }}
            containerStyle={{
              backgroundColor: "",
              borderColor: "",
              borderWidth: 0,
            }}
            checkedColor="blue"
            checked={InceputProiect}
          />
          <CheckBox
            center
            title="Terminare program"
            onPress={() => {
              if (FinalProiect === false && InceputProiect === false) {
                setFinalProiect(true);
              } else if (InceputProiect === true) {
                //alert("Poti selecta o singura optiune");
                setInceputProiect(false);
                setFinalProiect(true);
              } else {
                setFinalProiect(false);
              }
            }}
            containerStyle={{
              backgroundColor: "",
              borderColor: "",
              borderWidth: 0,
            }}
            checkedColor="blue"
            checked={FinalProiect}
          />
        </View>
      </View>

      <TouchableOpacity onPress={ValidareText} style={styles.buton_trimitere}>
        <Text style={{ textAlign: "center", color: "#fff", fontSize: 20 }}>
          TRIMITE
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lavender",
    alignItems: "center",
  },
  buton_trimitere: {
    marginTop: 100,
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#000080",
    borderWidth: 3,
    borderColor: "lightblue",
    padding: 3,
  },
  introducere: {
    alignItems: "center",
    marginTop: 100,
  },
  Text: {
    fontSize: 17,
    fontFamily: "hind-medium",
    marginTop: 20,
  },
  checkBoxView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "space-around",
    marginTop: 50,
    marginLeft: 15,
  },
});
