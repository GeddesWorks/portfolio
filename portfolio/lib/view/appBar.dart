import 'package:flutter/material.dart';
import 'package:portfilio/controller/appBarController.dart';
import 'dart:js' as js;

import 'package:portfilio/view/home_screen.dart';

PreferredSizeWidget appBar(BuildContext context) {
  Image youtube =
      Image.asset('images/YouTube_dark_logo_(2017).png', width: 200);
  Image printer = Image.asset('images/3dPrinter.png', width: 50);
  Image logo = Image.asset('images/GeddesWorksCutout.png');
  AppBarController con = AppBarController(context);

  return PreferredSize(
    preferredSize: Size.fromHeight(80.0),
    child: AppBar(
      automaticallyImplyLeading: false,
      backgroundColor: Colors.grey[600],
      elevation: 0,
      flexibleSpace: Padding(
        padding: const EdgeInsets.all(15),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(
              flex: 4,
              child: Row(
                children: [
                  logo,
                  const SizedBox(width: 10),
                  Text(
                    'Collin Geddes is GeddesWorks',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            Expanded(
              flex: 2,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton(
                    onPressed: con.goToHome,
                    icon: const Icon(
                      Icons.home,
                      color: Colors.black,
                    ),
                  ),
                  IconButton(
                    onPressed: con.goToResumeScreen,
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
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  InkWell(
                    borderRadius: BorderRadius.circular(100),
                    onTap: () {
                      js.context.callMethod(
                          'open', ['https://3dshop.geddesworks.com']);
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        children: [
                          printer,
                          const SizedBox(width: 5),
                          Text(
                            '3D Print Shop',
                            style: TextStyle(fontSize: 15),
                          ),
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
          ],
        ),
      ),
    ),
  );
}

PreferredSizeWidget appBarSmall() {
  Image logo = Image.asset('images/GeddesWorksCutout.png');

  return PreferredSize(
    preferredSize: const Size.fromHeight(60.0),
    child: AppBar(
      backgroundColor: Colors.grey[600],
      elevation: 0,
      flexibleSpace: Padding(
        padding: const EdgeInsets.all(15),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(
              flex: 4,
              child: Row(
                children: [
                  logo,
                  const SizedBox(width: 10),
                  const Text(
                    'Collin Geddes is GeddesWorks',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
