## Quick Setup

Using the information descried in the previous section, a quick setup can be performed by running the `setup` script with the appropriate values defined in the pipeline properties file. The steps are described below in detail.

### Installing Deploy master with ODI instance
Extract the deployer tar package on the client machine. Log into the cluster where the pipeline should get deployed. Then proceed with the steps listed below:
1. Move to the setup directory, `cd pipeline/setup`
2. Create a copy from the properties template file. `cp pipeline-properties.template pipeline-<cluster-name>.properties`
3. Replace the property variables with appropriate value as described in the table below:

| Property | Description | Example value |
| -------- | ----------- |------- |
| `odi.release` | ODI release version | `v2.0.4` also use as the version tag for the installer images.|
| `repo.public` | Name of the repo file for the GA entitlements. | `repo-public.yaml`|
| `repo.staging` | Name of the repo file for the Staging area entitlements. | `repo-staging.yaml`|
| `cluster.login.secret.name` | Cluster login secret used by the pipeline. | `<cluster>-login-secret`|
| `imagepull.registry.key` | Installer container image name. | `us.icr.io/odi-stg/odi-installer`|
| `deploy.namespace` | Namespace where pipeline will deploy. | `odi-deploy`|
| `deploy.service.account` | Name of the service account used by the pipeline. | `odi-deployer`|
| `deploy.file.storage` | Storage class used by pipeline and the OSDU component   | `ibmc-file-gold`|
| `deploy.block.storage` | Name of the repo file for the GA entitlements. | `ibmc-block-gold`|
| `cluster.shortname` | Name of the repo file for the GA entitlements. | `cluster-shortname`|
| `login.type` | Mode of authentication password or token. | `token`|
| `pipeline.run.yaml` | Area that pipeline should use for the deploy. | `repo-public.yaml`|
| `cpd.version` | Based Cloud Pak for Data version used by `cpd-cli`. | `3.5.4`|
| `odi.install.namespace` | ODI install namespace. | `osdu`|
| `hardware.arch` | Install hardware architecture. | `x86_64`|
| `external.cert.required` | Mode of authentication password or token. | `"No"`|

4. Copy the repo yaml files into the setup directory. 
5. Run the setup script. `./setup.sh pipeline-<cluster-name>.properties all | tee pipeline-<cluster-name>-install.log`
This should install the pipeline under the specified project and create the pipeline run manifests under `../runs/<cluster-name>` directory.
6. To upgrade the version of ODI, `cd ./runs/<cluster-name>; upgradeODI.sh` 

### Deploy setup for remote cluster
Setting up remote cluster is a two step process. Login to the target cluster using admin credentials. Then proceed with the steps listed below:
1. Create a copy from the properties template file to represent the target cluster. `cp pipeline-properties.template pipeline-<cluster-name>.properties`
1. Move to the setup directory, `cd pipeline/setup`
1. Run the setup script. `./setup.sh pipeline-<cluster-name>.properties setup-target | tee pipeline-<cluster-name>-target-install.log`. This sets up the service account and image pull secrets under the odi deploy namespace.
1. Note that the pipeline run manifests are generated under `../runs/<cluster-name>` directory.

Now, switch to the master deploy cluster and setup the remote cluster configuration. Login to the master cluster using admin credentials.
1. Run the setup script. `./setup.sh pipeline-<cluster-name>.properties setup-remote | tee pipeline-<cluster-name>-remote-install.log`. This sets up the the login secret and (optionally) repo configs under the odi deploy namespace.
1. To upgrade the version of ODI, `cd ./runs/<cluster-name>; upgradeODI.sh` 


## Using Deploy Automation components

### Installer image setup

Follow these steps to create an ODI installer image.

1. Clone the repo `git@github.ibm.com:osdu/odi-deploy-automation.git` and `cd pipeline/ci-cd`.

1. This folder contains build-image-pipeline.properties template which needs to be updated with the relevant parameters as below.

| Property | Description | Example value |
| -------- | ----------- |------- |
| `installer.image` | Installer container image name. | `us.icr.io/odi-stg/odi-installer`|
| `deployer.image` | Deployer container image name. | `us.icr.io/odi-stg/odi-deployer`|
| `gitreadonlyaccestoken` | Git PAT token from github. | `******`|
| `username` | IBM-SLB write secret username. | `******`|
| `apikey` | IBM-SLB write secret apikey. | `******`|

1. Login into the cluster where this pipeline will be created.

1. Run the command `create_config.sh` which will create the namespace, service account, PVC, secret, tekton tasks and pipeline. 

1. Run the command `build_installer_pipelinerun.sh <image-tag>` with appropriate image tag with which the pipeline run needs to be created.

1. After this, it will trigger this pipeline with the help of pipelinerun (build-installer-image-pipeline-run.yaml). The container image is then pushed to the image registry `us.icr.io/odi-stg/` with the latest tag.

Use the installer image for manual installation of the ODI as described in the `Manual install` section.

### Pipelines 
Manifests for Tekton constructs are under the `/pipeline/manifests` directory. These yaml files create the tasks and pipelines.

| Pipeline | Description | Supporting tasks |
| -------- | ----------- | ---------------- |
| `login-pipeline` | Sets up login context for deploy and target clusters | `login-task` |
| `uninstall-odi-pipeline` | Uninstalls ODI instance | `uninstall-odi` |
| `install-odi-prereqs-pipeline` | Installs ODI prereqs | `install-odi-prereqs` |
| `install-control-plane-pipeline` | Sets up CPD service accounts | `install-cpd-control-plane` |
| `install-osdu-pipeline` | Installs adm lite and OSDU | `install-osdu` |
| `run-post-install-pipeline` | Runs post install script | `run-post-install-script` |
| `run-sanity-test-pipeline` | Runs sanity test | `run-sanity-test` |
| `install-validate-pipeline` | Validates installation | `run-sanity-test, run-postman-collection` |
| `upgrade-odi-pipeline` | Sets up login context for deploy and target clusters | `login-task, uninstall-odi, install-odi-prereqs, install-cpd-control-plane, install-osdu, run-post-install-script ` |

#### Pipeline runs
Pipeline runs manage the execution of pipelines across various clusters. Pipeline runs are generated per cluster and kept under the `pipeline/runs` directory.

#### Commands
- `installOpenShiftPipeline.sh`
Installs OpenShift pipelines operator

- `installODIDeployPipeline.sh`
Installs ODI pipeline deploy artifacts.

- `createServiceAccount.sh`
Sets up the remote cluster for ODI deploy. Creates the namespace and the service account.

- `uninstallPipeline.sh`
Uninstalls deploy artifacts, deletes the pipeline namespace and uninstalls the pipeline operator.


#### Building the deployer image

Follow these steps to create an ODI deployer image.

1. Clone the repo `git@github.ibm.com:osdu/odi-deploy-automation.git` and `cd pipeline/ci-cd`.

1. This folder contains build-image-pipeline.properties template which needs to be updated with the relevant parameters.

1. Login into the cluster where this pipeline will be created.

1. Run the command `create_config.sh` which will create the namespace, service account, PVC, secret, tekton tasks and pipeline. 

1. Run the command `build_deployer_pipelinerun.sh <image-tag>` with appropriate image tag with which the pipeline run needs to be created.

1. After this, it will trigger this pipeline with the help of pipelinerun (build-deployer-image-pipeline-run.yaml). The container image is then pushed to the image registry `us.icr.io/odi-stg/` with the latest tag.


#### Running the pipelines using the Tekton CLI.
More information [here](UsingTknCLI.md).

#### Uninstalling pipeline
Uninstalling pipeline deletes the `odi-deploy` namespace and uninstalls the OpenShift pipelines operator. Run the commands listed below:

`cd setup; uninstallPipeline.sh`

### Manual installation
Un-tar the deployer package or get the docker image to run a manual installation. 

Login to the registry `us.icr.io` using the ready key and then run the following command to setup the install client using the docker container.

`docker run -it us.icr.io/odi-stg/odi-installer:<version> bash`

Install ODI using the script `cd installer; ./installODI.sh`

### Cluster Provisioning

This package provides a setup of Terraform scripts to provision an OpenShift cluster in IBM Cloud with the specifications required to deploy an ODI instance.

Steps to follow:

1. Setup the variables.
1. Run the command `terraform plan`
1. Review the infrastructure items that will get created. Run `terraform apply`

## Environments
Follow this [link](Environments.md) to view all the environments managed by the deploy pipeline.

## Getting Pipeline backup logs on local

1. Go to the setup directory.
2. Run the script `./copy-backup-local.sh PIPELINE_RUN_NAME`
3. This will create a tar file i.e backup-log-files.tar which contains logs for a particular Pipeline-run.

## Using BuildConfig to build installer/deployer images

### Setup buildconfigs for Dev or Integration clusters

1. Run the script `setupBuildConfigforDev.sh` passing the respective values i.e..,  BRANCH_NAME of the repo OR TAG for the image, base64 encoded username and password for the git source clone
2. This will create the namespace, ImageStreams, secrets and buildConfigs for building installer and deployer images. 
3. Once the buildConfigs for installer and deployer images are created, OpenShift will create a new build for the respective buildConfigs and pushed to the internal registry.
4. Now for auto-triggering the builds for consecutive git pushes, please follow the below steps:

5. After creating a BuildConfig from a GitHub repository, run:
 oc describe bc/<name-of-your-BuildConfig> -n ci-cd | awk '/webhooks/ {print $2}'
This generates a generic webhook GitHub URL 
 Also run the below command for retrieving the webhook secret name
 oc get bc/<name-of-your-BuildConfig> -o=jsonpath='{.spec.triggers..github.secret}' -n ci-cd
 
Either copy the entire webhook URL with the secret name in it by replacing the <secret> in webhook generic URL from the above commands OR you can Copy  URL with secret in the details of the buildConfig for installer or deployer buildConfig in the OpenShift cluster UI

Adding the OpenShift created webhook URL to GitHub
Now this webhook URL with the webhook secret name in it must be added to the hooks in GitHub setting on which repository the trigger for webhook is configured to. 

For creating a new hook on Github, go to the settings in the repository, go to the hooks, click on add a webhook, paste the webhook URL in the payload URL which can be retrieved from the above steps, change the content type to application/json, add the webhook secret created from the above steps and then click on add webhook.

Unique webhooks for installer buildConfig and deployer buildConfig must be created so that whenever a git push happens to the given branch in buildConfig, unique payloads will be sent to both the installer and deployer build configs.