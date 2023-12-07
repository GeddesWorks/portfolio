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
import 'package:portfilio/view/mainDrawer.dart';
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
    model.screenWidth = MediaQuery.of(context).size.width;
    double baseScale = model.screenWidth / 1200;
    model.scaleFactor = model.screenWidth > 1200
        ? baseScale
        : model.screenWidth > 600
            ? baseScale * 2
            : baseScale * 2;

    return Scaffold(
      backgroundColor: Colors.grey[800],
      appBar: model.screenWidth > 975 ? appBar(context) : appBarSmall(),
      endDrawer: model.screenWidth <= 975
          ? drawerContents(model.scaleFactor, context)
          : null,
      body: SingleChildScrollView(
        child: ContentWrapper(
          footerPadding: 16,
          child: FadeIn(
            duration: const Duration(milliseconds: 2000),
            controller: FadeInController(autoStart: true),
            child: model.screenWidth > 1200
                ? Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      videoSection(context, model.screenWidth / 2),
                      textSection(this, model.screenWidth / 2)
                    ],
                  )
                : Column(
                    children: [
                      videoSection(context, model.screenWidth),
                      SizedBox(height: 60 * (model.scaleFactor / 2)),
                      textSection(this, model.screenWidth)
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

  Widget textSection(HomeState state, double width) {
    Image cultsLogo = Image.asset(
      'images/cults.png',
      width: 50 * state.model.scaleFactor,
    );
    Image liInLogo = Image.asset(
      'images/linked.png',
      width: 50 * state.model.scaleFactor,
    );
    Image githubLogo = Image.asset(
      'images/github-mark.png',
      width: 50 * state.model.scaleFactor,
    );

    return Container(
      color: Colors.grey[600],
      width: width * .9,
      height: width > 430 ? ((width * .9) / 5) * 4 : ((width * .9) / 5) * 4.5,
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Header(
            title: 'Collin Geddes is GeddesWorks',
            subtitle: 'Developer Extraordinaire | 3D Printing Enthusiast',
            location: 'Edmond, OK',
            avatarUrl: 'images/GeddesWorksCutout.png',
            scaleFactor: state.model.scaleFactor,
          ),
          SizedBox(height: 60 * (state.model.scaleFactor / 2)),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                children: [
                  Text(
                    'About',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 24 * state.model.scaleFactor),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Current Paycom Software Developer Intern',
                    style: TextStyle(fontSize: 15 * state.model.scaleFactor),
                  ),
                  Text(
                    'Aspiring Full Stack Developer',
                    style: TextStyle(fontSize: 15 * state.model.scaleFactor),
                  ),
                  Text(
                    'CS Student at UCO',
                    style: TextStyle(fontSize: 15 * state.model.scaleFactor),
                  ),
                  Text(
                    'Drone Pilot',
                    style: TextStyle(fontSize: 15 * state.model.scaleFactor),
                  ),
                ],
              ),
              Column(
                children: [
                  Text(
                    'Services',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 24 * state.model.scaleFactor),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Full Stack',
                    style: TextStyle(fontSize: 15 * state.model.scaleFactor),
                  ),
                  Text(
                    'Web Design',
                    style: TextStyle(fontSize: 15 * state.model.scaleFactor),
                  ),
                  Text(
                    '3D Printing',
                    style: TextStyle(fontSize: 15 * state.model.scaleFactor),
                  ),
                  Text(
                    'Arial Photography',
                    style: TextStyle(fontSize: 15 * state.model.scaleFactor),
                  ),
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
                  js.context.callMethod(
                      'open', ['https://www.linkedin.com/in/collingeddes']);
                },
                icon: liInLogo,
              ),
            ],
          )
        ],
      ),
    );
  }
}
