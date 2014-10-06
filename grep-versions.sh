echo "******* Chrome WebStore version:"
grep "\"version" src/manifest/manifest.json
echo "*"
echo "******* HTML5 AppCache version:"
grep "Version" src/main/webapp/timout.appcache
echo "*"
echo "******* AppEngine version:"
grep "version" src/main/webapp/WEB-INF/appengine-web.xml
echo "-"
echo "------- KONTROLA - index.html version:"
grep "Version" src/main/webapp/index.html

