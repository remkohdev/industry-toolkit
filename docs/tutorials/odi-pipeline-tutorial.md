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