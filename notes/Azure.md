# Deploying to Azure Container Registry Service with Azure Pipelines

- Setup a free account with Azure
- Enable devops
- Create container registry to push docker image to
- Use docker image for command line client.

* `docker run -it mcr.microsoft.com/azure-cli`

* Azure Devops Notes
* https://docs.microsoft.com/azure/devops/pipelines/languages/docker
* Created a resource group
  * PaseoWordpress
  * Region: South Africa North
  * Subscription: Free Trial
* Create a registry
  * nziswanomultisite.azurcr.io - docker registry
* Create a new devops organization
  * Under settings, create a **Service connections**
  * Service name is nziswano docker registry

  $(GITHUB_AUTH)
$(image_name)
