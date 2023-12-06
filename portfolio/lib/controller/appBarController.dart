import 'package:flutter/cupertino.dart';

class AppBarController {
  BuildContext context;
  AppBarController(this.context);

  void goToResumeScreen() {
    Navigator.pushNamed(context, '/resume');
  }
}
