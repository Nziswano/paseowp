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
* Under devops use My Azure DevOps Orgnizations

* Seperate build and push operations
  https://stackoverflow.com/questions/60287354/i-am-using-azure-devops-to-build-and-push-my-docker-image-how-can-i-pass-argume

  Variables
  $(GITHUB_AUTH)
  $(image_name)
