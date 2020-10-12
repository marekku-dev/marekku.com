<?php

exec("/usr/bin/wget --output-document=/home/httpd/vhosts/marekku.com/httpdocs/ikigai/data/orders.csv 'https://docs.google.com/spreadsheets/d/1jikdoGBXQL9zLUYCcsR_eNCMxR7oafNP3Uu1kG518-U/export?gid=1540375745&format=csv&id=1jikdoGBXQL9zLUYCcsR_eNCMxR7oafNP3Uu1kG518-U' ");

exec("/usr/bin/wget --output-document=/home/httpd/vhosts/marekku.com/httpdocs/ikigai/data/dataHeatmap.csv 'https://docs.google.com/spreadsheets/d/1jikdoGBXQL9zLUYCcsR_eNCMxR7oafNP3Uu1kG518-U/export?gid=2028789420&format=csv&id=1jikdoGBXQL9zLUYCcsR_eNCMxR7oafNP3Uu1kG518-U' ");

?>