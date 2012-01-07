echo "******* Chrome WebStore version:"
grep "version" src/manifest/manifest.json
echo "*"
echo "******* HTML5 AppCache version:"
grep "Version" war/timout.appcache
echo "*"
echo "******* AppEngine version:"
grep "version" war/WEB-INF/appengine-web.xml
echo "-"
echo "------- KONTROLA - index.html version:"
grep "Version" war/index.html

