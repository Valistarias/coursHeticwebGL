<!doctype html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <title>MUSEUM</title>
        <meta name="description" content="MUSEUM" />

        <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans:400,700" rel="stylesheet">

        <!-- SCRIPTS DE BASE -->
        <script src="http://www.babylonjs.com/babylon.js"></script>
        <!-- FEUILLES CSS -->
        <link rel="stylesheet" type="text/css" href="css/mainStyle.css" />
    </head>
    <body>
        <canvas id="renderCanvas"></canvas>
        <div id="imgMuseum">
        <?php
            $query = "space";
            if(isset($_GET['query'])){
                $query = $_GET['query'];
            }
            
            $numberPaintings = 20;
            if(isset($_GET['number'])){
                // var_dump($_GET['number']);
                $numberPaintings = $_GET['number'];
            }

            $xmlurl = "http://backend.deviantart.com/rss.xml?type=deviation&q=in:digitalart+sort:hot+".$query."&limit=".$numberPaintings."&mature_content=false";

            ini_set('user_agent', $_SERVER['HTTP_USER_AGENT']);

            $getData = file_get_contents($xmlurl);

            $deviantDatas = new SimpleXMLElement($getData);

            foreach ($deviantDatas->channel->item as $item) {
                $media = $item->children('http://search.yahoo.com/mrss/');

                $image = $media->content->attributes();
                // Read image path, convert to base64 encoding
                $imageData = base64_encode(file_get_contents($image->url));

                $src = 'data:image/jpeg;base64,'.$imageData;

                // Echo out a sample image
                echo '<img width="'.$image->width.'" height="'.$image->height.'" src="'.$src.'">';
            }
            
        ?>
        </div>
    </body>
    <!-- SCRIPTS BABYLON -->
    <script src="js/Game.js"></script>
    <script src="js/Arena.js"></script>
    <script src="js/User.js"></script>
</html>