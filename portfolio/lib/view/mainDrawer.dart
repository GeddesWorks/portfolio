import 'package:flutter/material.dart';
import 'dart:js' as js;

import 'package:portfilio/controller/appBarController.dart';

Widget drawerContents(double scaleFactor, BuildContext context) {
  Image cultsLogo = Image.asset(
    'images/cults.png',
    width: 50 * scaleFactor,
  );
  Image liInLogo = Image.asset(
    'images/linked.png',
    width: 50 * scaleFactor,
  );
  Image githubLogo = Image.asset(
    'images/github-mark.png',
    width: 50 * scaleFactor,
  );

  Image youtube =
      Image.asset('images/YouTube_dark_logo_(2017).png', width: 200);
  Image printer = Image.asset('images/3dPrinter.png', width: 50);

  AppBarController con = AppBarController(context);

  return Drawer(
    child: Column(
      children: [
        Expanded(
          flex: 6,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                onPressed: () {
                  // Action for Resume
                },
                icon: const Icon(
                  Icons.description,
                  color: Colors.black,
                ),
              ),
              // IconButton(
              //   onPressed: () {
              //     // Action for Portfolio
              //   },
              //   icon: const Icon(
              //     Icons.work,
              //     color: Colors.black,
              //   ),
              // ),
              // IconButton(
              //   onPressed: () {
              //     // Action for About
              //   },
              //   icon: const Icon(
              //     Icons.info,
              //     color: Colors.black,
              //   ),
              // ),
            ],
          ),
        ),
        Expanded(
          flex: 4,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              InkWell(
                borderRadius: BorderRadius.circular(100),
                onTap: () {
                  js.context
                      .callMethod('open', ['https://3dshop.geddesworks.com']);
                },
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      printer,
                      const SizedBox(width: 5),
                      const Text('3D Print Shop'),
                    ],
                  ),
                ),
              ),
              IconButton(
                onPressed: () {
                  js.context.callMethod('open', [
                    'https://www.youtube.com/channel/UCl6UJ-zSBmVH_TGAgRP-gbw'
                  ]);
                },
                icon: youtube,
              ),
            ],
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              onPressed: () {
                js.context.callMethod('open',
                    ['https://cults3d.com/en/users/GeddesWorks/3d-models']);
              },
              icon: cultsLogo,
            ),
            IconButton(
              onPressed: () {
                js.context
                    .callMethod('open', ['https://github.com/GeddesWorks']);
              },
              icon: githubLogo,
            ),
            IconButton(
              onPressed: () {
                js.context
                    .callMethod('open', ['www.linkedin.com/in/collingeddes']);
              },
              icon: liInLogo,
            ),
          ],
        )
      ],
    ),
  );
}
