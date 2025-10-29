import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Define el owner manualmente
  const ownerAddress = "0xBF4DA77F4E78F0E31946eB243d0B148cb80b72f1";

  await deploy("YourContract", {
    from: deployer,
    // Pasa el owner como argumento del constructor
    args: [ownerAddress],
    log: true,
    autoMine: true,
  });

  const yourContract = await hre.ethers.getContract<Contract>("YourContract", deployer);
  console.log("👋 Initial greeting:", await yourContract.greeting());
  console.log("👤 Contract Owner:", await yourContract.owner());
};

export default deployYourContract;
deployYourContract.tags = ["YourContract"];