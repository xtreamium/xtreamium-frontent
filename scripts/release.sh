if [ -z "$(git status --porcelain)" ]; then 
    echo Repository is clean
else 
    echo Repository is dirty, please commit before releasing
    exit 1
fi

current_branch=$((git symbolic-ref HEAD 2>/dev/null || echo "(unnamed branch)")|cut -d/ -f3-)
if [ "$current_branch" != "develop" ]; then
    echo "You are not on develop branch, please switch to develop before releasing"
    exit 1
fi
patchlevel=patch

npm --tag-version-prefix="" version $patchlevel
PACKAGE_VERSION=$(cat package.json |
    grep version |
    head -1 |
    awk -F: '{ print $2 }' |
    sed 's/[",]//g' |
    tr -d '[[:space:]]')
echo $PACKAGE_VERSION

git checkout trunk
git merge develop
git push --tags origin trunk develop