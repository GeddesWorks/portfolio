import 'package:flutter/material.dart';

class HomeModel {
  bool menuDrawerOpen = false;
  double screenWidth = 0;

  Image logo = Image.asset('images/GeddesWorksCutout.png');
  String vidUrl =
      "https://geddesworks.blob.core.windows.net/videos/IntroVideoHD.mp4?sv=2023-01-03&st=2023-12-06T02%3A42%3A13Z&se=2023-12-07T02%3A57%3A13Z&sr=c&sp=r&sig=eTSlkA0ELgEvjic5%2B2XjTiWZy6TCUQ21IrSbWvf6N5k%3D";

  Image cultsLogo = Image.asset(
    'images/cults.png',
    width: 50,
  );
  Image liInLogo = Image.asset(
    'images/linked.png',
    width: 50,
  );
  Image githubLogo = Image.asset(
    'images/github-mark.png',
    width: 50,
  );

  Image youtube =
      Image.asset('images/YouTube_dark_logo_(2017).png', width: 200);
  Image printer = Image.asset('images/3dPrinter.png', width: 50);
}
