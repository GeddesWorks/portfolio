import 'package:flutter/material.dart';
import 'package:portfilio/view/home_screen.dart';

void main() {
  runApp(const Portfolio());
}

class Portfolio extends StatelessWidget {
  const Portfolio({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    var textScaleFactor =
        calculateTextScaleFactor(MediaQuery.of(context).size.width);

    return MaterialApp(
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: Colors.grey,
        fontFamily: 'Roboto',
        scrollbarTheme: ScrollbarThemeData(
          thumbColor: MaterialStateProperty.all<Color>(Colors.black),
        ),
        textTheme: TextTheme(
          headlineSmall: TextStyle(
            fontSize: 10 * textScaleFactor,
            fontWeight: FontWeight.w400,
            color: Colors.black,
          ),
          headlineMedium: TextStyle(
            fontSize: 15 * textScaleFactor,
            fontWeight: FontWeight.w400,
            color: Colors.black,
          ),
          headlineLarge: TextStyle(
            fontSize: 20 * textScaleFactor,
            fontWeight: FontWeight.w400,
            color: Colors.black,
          ),
          bodySmall: TextStyle(
            fontSize: 12 * textScaleFactor,
            fontWeight: FontWeight.w400,
            color: Colors.black,
          ),
          bodyMedium: TextStyle(
            fontSize: 16 * textScaleFactor,
            fontWeight: FontWeight.w400,
            color: Colors.black,
          ),
          bodyLarge: TextStyle(
            fontSize: 20 * textScaleFactor,
            fontWeight: FontWeight.w400,
            color: Colors.black,
          ),
          labelSmall: TextStyle(
            fontSize: 8 * textScaleFactor,
            fontWeight: FontWeight.w400,
            color: Colors.black,
          ),
          labelMedium: TextStyle(
            fontSize: 12 * textScaleFactor,
            fontWeight: FontWeight.w400,
            color: Colors.black,
          ),
          labelLarge: TextStyle(
            fontSize: 15 * textScaleFactor,
            fontWeight: FontWeight.w400,
            color: Colors.black,
          ),
        ),
      ),
      initialRoute: Home.routeName,
      title: 'GeddesWorks',
      routes: {
        Home.routeName: (context) => const Home(),
      },
    );
  }

  double calculateTextScaleFactor(double screenWidth) {
    // You can adjust these values based on your design and responsiveness needs
    if (screenWidth >= 1200) {
      return 1.5; // Large screens, increase text size
    } else if (screenWidth >= 600) {
      return 1.0; // Medium-sized screens
    } else {
      return .8; // Smaller screens, default text size
    }
  }
}
