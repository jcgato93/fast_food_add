import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { name, email, password } = form;

      if (!email || !password || !name) {
        Alert.alert("Error", "Por favor completa todos los campos.");
        return;
      }

      // Call Appwrite sign-up function
      await createUser({
        name: name,
        email: email,
        password: password,
      });

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt5">
      <CustomInput
        placeholder="Ingresa tu nombre"
        value={form.name}
        onChangeText={(text) => {
          setForm({ ...form, name: text });
        }}
        label="Nombre completo"
        keyboardType="default"
      />

      <CustomInput
        placeholder="Ingresa tu correo"
        value={form.email}
        onChangeText={(text) => {
          setForm({ ...form, email: text });
        }}
        label="Correo electrónico"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Ingresa tu contraseña"
        value={form.password}
        onChangeText={(text) => {
          setForm({ ...form, password: text });
        }}
        label="Contraseña"
        keyboardType="default"
        secureTextEntry
      />
      <CustomButton title="Registrar" onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Ya tienes una cuenta?{" "}
          <Link href={"/sign-in"} className="text-primary font-bold">
            Ingresa
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
