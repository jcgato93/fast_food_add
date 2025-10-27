import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (!form.email || !form.password) {
        Alert.alert("Error", "Por favor completa todos los campos.");
        return;
      }

      // Call Appwrite sign-in function
      await signIn({
        email: form.email,
        password: form.password,
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
      <CustomButton title="Ingresar" onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          No tienes una cuenta?{" "}
          <Link href={"/sign-up"} className="text-primary font-bold">
            Regístrate
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
