import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => navigation.navigate("Home"))
      .catch((error) => {
        alert(error.meesage);
      });
  };

  return (
    <View style={tw("flex-1 items-center pt-1")}>
      <Image
        source={{ uri: "https://links.papareact.com/2pf" }}
        resizeMode="contain"
        style={tw("h-20 w-full")}
      />
      <Text style={tw("text-xl text-gray-500 font-bold")}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw("text-center p-4 text-red-400 font-bold")}>
        Step 1: The profile Pic
      </Text>

      <TextInput
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter a profile pic url"
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <Text style={tw("text-center p-4 text-red-400 font-bold")}>
        Step 2: The Job
      </Text>

      <TextInput
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter your occupation"
        value={job}
        onChangeText={(text) => setJob(text)}
      />
      <Text style={tw("text-center p-4 text-red-400 font-bold")}>
        Step 3: The Age
      </Text>

      <TextInput
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter your age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="number-pad"
        maxLength={2}
      />
      <TouchableOpacity
        onPress={updateUserProfile}
        disabled={incompleteForm}
        style={[
          tw("w-64 p-3 rounded-xl absolute bottom-10"),
          incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
        ]}
      >
        <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
