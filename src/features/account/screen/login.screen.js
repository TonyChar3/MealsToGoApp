import React, { useState, useContext } from "react";

import { TextInput } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { ActivityIndicator, MD3Colors } from "react-native-paper";

import {
  AccountBackground,
  AccountCover,
  LoginContainer,
  AuthButton,
  Title,
  ErrorContainer,
} from "../components/account.styles";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const LoginScreen = ({ navigation }) => {
  const { onLogin, error, setError, isLoading } = useContext(
    AuthenticationContext,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <LoginContainer>
        <TextInput
          label="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <Spacer size="large" />
        <TextInput
          label="Password"
          secureTextEntry={seePassword ? false : true}
          value={password}
          autoCapitalize="none"
          onChangeText={(val) => setPassword(val)}
          right={
            <TextInput.Icon
              icon={seePassword ? "eye" : "eye-off"}
              onPress={() => setSeePassword(!seePassword)}
            />
          }
        />
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large" />
        {!isLoading ? (
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => onLogin(email, password)}
          >
            LOGIN
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color={MD3Colors.blue300} />
        )}
      </LoginContainer>
      <Spacer size="large">
        <AuthButton
          mode="contained"
          onPress={() => {
            setError(null);
            navigation.goBack();
          }}
        >
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
