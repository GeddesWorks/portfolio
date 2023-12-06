import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_fadein/flutter_fadein.dart';
import 'package:portfilio/controller/homeController.dart';
import 'package:portfilio/model/home_model.dart';
import 'package:portfilio/view/appBar.dart';
import 'package:portfilio/view/contentWrapper.dart';
import 'package:portfilio/view/homeWidgets/bioEntry.dart';
import 'package:portfilio/view/homeWidgets/header.dart';
import 'package:portfilio/view/homeWidgets/paragraph.dart';
import 'package:video_player/video_player.dart';
import 'dart:js' as js;

class Home extends StatefulWidget {
  const Home({super.key});

  static const routeName = '/';

  @override
  State<StatefulWidget> createState() {
    return HomeState();
  }
}

class HomeState extends State<Home> {
  late VideoPlayerController vController;
  late HomeModel model;
  late HomeController con;

  @override
  void initState() {
    super.initState();
    model = HomeModel();
    con = HomeController(this);
    vController = VideoPlayerController.networkUrl(Uri.parse(model.vidUrl))
      ..initialize().then((_) {
        // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
        setState(() {
          vController.setVolume(0);
          vController.play();
          vController.setLooping(true);
        });
      });
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double baseScale = screenWidth / 1200;
    double scaleFactor = screenWidth > 1200
        ? baseScale
        : screenWidth > 600
            ? baseScale * 2
            : baseScale / 3;
    return Scaffold(
      backgroundColor: Colors.grey[800],
      appBar:
          screenWidth > 1200 ? appBar(this, scaleFactor) : appBarSmall(this),
      endDrawer: screenWidth <= 1200 ? drawerContents() : null,
      body: SingleChildScrollView(
        child: ContentWrapper(
          footerPadding: 16,
          child: FadeIn(
            duration: const Duration(milliseconds: 2000),
            controller: FadeInController(autoStart: true),
            child: screenWidth > 1200
                ? Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      videoSection(context, screenWidth / 2),
                      textSection(context, screenWidth / 2)
                    ],
                  )
                : Column(
                    children: [
                      videoSection(context, screenWidth),
                      textSection(context, screenWidth)
                    ],
                  ),
          ),
        ),
      ),
    );
  }

  Widget videoSection(BuildContext context, double width) {
    return SizedBox(
      width: width * .9,
      height: ((width * .9) / 5) * 4,
      child: VideoPlayer(vController),
    );
  }

  Widget textSection(BuildContext context, double width) {
    return Container(
      color: Colors.grey[600],
      width: width * .9,
      height: ((width * .9) / 5) * 4,
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Header(
            title: 'Collin Geddes is GeddesWorks',
            subtitle: 'Developer Extraordinaire | 3D Printing Enthusiast',
            location: 'Edmond, OK',
            avatarUrl: 'images/GeddesWorksCutout.png',
          ),
          const SizedBox(height: 60),
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                children: [
                  Text(
                    'About',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 12),
                  Text('Current Paycom Software Developer Intern'),
                  Text('Aspiring Full Stack Developer'),
                  Text('CS Student at UCO'),
                  Text('Drone Pilot'),
                ],
              ),
              Column(
                children: [
                  Text(
                    'Services',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 12),
                  Text('Full Stack'),
                  Text('Web Design'),
                  Text('3D Printing'),
                  Text('Arial Photography'),
                ],
              ),
            ],
          ),
          const Spacer(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              IconButton(
                onPressed: () {
                  js.context.callMethod('open',
                      ['https://cults3d.com/en/users/GeddesWorks/3d-models']);
                },
                icon: model.cultsLogo,
              ),
              IconButton(
                onPressed: () {
                  js.context
                      .callMethod('open', ['https://github.com/GeddesWorks']);
                },
                icon: model.githubLogo,
              ),
              IconButton(
                onPressed: () {
                  js.context
                      .callMethod('open', ['www.linkedin.com/in/collingeddes']);
                },
                icon: model.liInLogo,
              ),
            ],
          )
        ],
      ),
    );
  }

  Widget drawerContents() {
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
                        model.printer,
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
                  icon: model.youtube,
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
                icon: model.cultsLogo,
              ),
              IconButton(
                onPressed: () {
                  js.context
                      .callMethod('open', ['https://github.com/GeddesWorks']);
                },
                icon: model.githubLogo,
              ),
              IconButton(
                onPressed: () {
                  js.context
                      .callMethod('open', ['www.linkedin.com/in/collingeddes']);
                },
                icon: model.liInLogo,
              ),
            ],
          )
        ],
      ),
    );
  }
}
