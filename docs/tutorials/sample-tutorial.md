## Part 1 Create an Assisted-Installer cluster instance and download the discovery ISO

1. Download OCM token from [your account](https://console.redhat.com/openshift/token/show)

    echo "Token String From OCM API Token Link Above" > ~/ocm-token

2. Download your [pull secret](https://console.redhat.com/openshift/install/pull-secret) and save it in a file: `pull-secret.json`

3. Refresh your token

    . refreshToken.sh

4. Set and source your variables

    . variables.sh

5. Create your deployment data from template

    . create-deployment-data.sh

6. Create cluster draft using the Assisted Installer API

    . create-cluster-draft.sh

7. Generate the ISO to download

    . generator-iso.sh

8. Download the ISO

    . download-iso.sh

## Part 2 Create VM using Discovery ISO

## Part 3 Finish Openshift install using Assisted Installer API
