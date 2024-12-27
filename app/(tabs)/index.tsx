import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Calculator = () => {
  const [expression, setExpression] = useState("");

  // Note: Keyboard handling is platform-specific and might need different implementation
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key;

        if (key.match(/^[0-9]$/) || ["+", "-", "*", "/", "."].includes(key)) {
          handleButtonClick(key);
        } else if (key === "Enter" || key === "=") {
          calculateResult();
        } else if (key === "Backspace") {
          clearExpression();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const handleButtonClick = (value: string) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const calculateResult = () => {
    try {
      setExpression(eval(expression).toString());
    } catch (error) {
      setExpression("Error");
    }
  };

  const clearExpression = () => {
    setExpression("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.calculatorContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>
            {expression || "0"}
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          {/* First row */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={clearExpression}>
              <Text style={styles.buttonText}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => handleButtonClick("+/-")}>
              <Text style={styles.buttonText}>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => handleButtonClick("%")}>
              <Text style={styles.buttonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => handleButtonClick("/")}>
              <Text style={styles.buttonText}>÷</Text>
            </TouchableOpacity>
          </View>

          {/* Number pad rows */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick("7")}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick("8")}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick("9")}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => handleButtonClick("*")}>
              <Text style={styles.buttonText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick("4")}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick("5")}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick("6")}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => handleButtonClick("-")}>
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick("1")}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick("2")}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick("3")}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={calculateResult}>
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.darkButton, styles.zeroButton]} onPress={() => handleButtonClick("0")}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => handleButtonClick(".")}>
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer with label */}
        <Text style={styles.footerText}>Calculator by Suryansh</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  calculatorContainer: {
    flex: 1,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  displayContainer: {
    padding: 16,
    marginBottom: 24,
  },
  displayText: {
    fontSize: 48,
    textAlign: 'right',
    color: 'black',
    fontWeight: '300',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  zeroButton: {
    width: 176,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  grayButton: {
    backgroundColor: '#D1D5DB',
  },
  darkButton: {
    backgroundColor: '#374151',
  },
  orangeButton: {
    backgroundColor: '#FB923C',
  },
  whiteButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FB923C',
  },
  orangeText: {
    color: '#FB923C',
  },
  greenButton: {
    backgroundColor: 'green',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
});

export default Calculator;
