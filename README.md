# Paseo Baptist Church, Preschool and the Martins Web Site
## Overview
Build a website for Paseo Baptist Church in Soweto, Johannesburg. Use the same wordpress instance for the Preschool/daycare center and the Martin Family.

* Using wordpress multisite for the project(s).
* Foundation being used for creating the themes.
* ~~Using mustache templating engine to process the theme.~~
  * ~~Using it in creating the individual pages.~~
  * ~~Easier to incorporate into overall scheme.~~

## Setting up with composer.json
* Adding *humanmade/s3-uploads* via composer.
  1. Add **"humanmade/s3-uploads":"@master"** in *composer.json*.
  1. Add *humanmade* repository
```json
    "humanmade/s3-uploads":"dev-master",
  {
    "type": "vcs",
    "url": "https://github.com/humanmade/S3-Uploads.git"
  }
```

## Deploying the site
### Backend Code - Wordpress Code
1. Create tag of current site in master
    * `git checkout master`
    * `git tag -a v1.0 -m "Initial version of site launched"`
    * `git push origin --tags`
1. Merge code to master.
    * `git checkout mastger`
    * `git merge dev`
    * `git push origin`
1. Deploy backend code to server
    * `ssh -i keyfile.pem {user}@{server}`
    * Update server: 
        * `sudo apt-get update`
        * `sudo apt-get upgrade -y`
    * Access the correct folder
        * `/path/to/wordpress/folder`
        * `git pull origin master`
    * Run composer update without dev.
        * `composer update --no-dev -vvv` - no dev packages and verbose.
1. Login and activate plugins.
1. Test API access.

### Issues with deployment
* Error *PHP Fatal error: Uncaught exception 'ErrorException' with message 'proc_open(): fork failed - Cannot allocate memory' in phar*
    * [proc-open-fork-failed-errors for details](https://getcomposer.org/doc/articles/troubleshooting.md#proc-open-fork-failed-errors for details)
```bash
/bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
/sbin/mkswap /var/swap.1
/sbin/swapon /var/swap.1
```
    
