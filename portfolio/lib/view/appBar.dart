import 'package:flutter/material.dart';
import 'dart:js' as js;

import 'package:portfilio/view/home_screen.dart';

PreferredSizeWidget appBar(HomeState state, double scaleFactor) {
  scaleFactor = 1;

  return PreferredSize(
    preferredSize: Size.fromHeight(80.0 * scaleFactor),
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
                  state.model.logo,
                  const SizedBox(width: 10),
                  Text(
                    'Collin Geddes is GeddesWorks',
                    style: TextStyle(
                        fontSize: 24 * scaleFactor,
                        fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            Expanded(
              flex: 1,
              child: Row(
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
                  IconButton(
                    onPressed: () {
                      // Action for Portfolio
                    },
                    icon: const Icon(
                      Icons.work,
                      color: Colors.black,
                    ),
                  ),
                  IconButton(
                    onPressed: () {
                      // Action for About
                    },
                    icon: const Icon(
                      Icons.info,
                      color: Colors.black,
                    ),
                  ),
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
                          state.model.printer,
                          const SizedBox(width: 5),
                          Text(
                            '3D Print Shop',
                            style: TextStyle(fontSize: 15 * scaleFactor),
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
                    icon: state.model.youtube,
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

PreferredSizeWidget appBarSmall(HomeState state) {
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
            // IconButton(
            //     onPressed: () {
            //       Scaffold.of(state.context).openDrawer();
            //     },
            //     icon: const Icon(Icons.menu)),
          ],
        ),
      ),
    ),
  );
}
