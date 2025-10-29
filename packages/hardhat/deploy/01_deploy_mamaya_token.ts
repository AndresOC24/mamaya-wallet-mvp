import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMamayaToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { save, getOrNull } = hre.deployments;

  // Dirección del token MMT ya desplegado en Sepolia
  const mamayaTokenAddress = "0x1F380D35d2b84E3911AA5EbbdeC9685f9163f58C";
  
  // Verifica si ya está guardado
  const existing = await getOrNull("MamayaToken");
  
  if (!existing) {
    // Guarda la referencia al contrato existente
    const artifact = await hre.deployments.getExtendedArtifact("YourContract");
    
    await save("MamayaToken", {
      address: mamayaTokenAddress,
      abi: artifact.abi, // Usa el ABI de tu contrato o crea uno específico para ERC20
    });
    
    console.log("✅ Mamaya Token registrado en:", mamayaTokenAddress);
  }
};

export default deployMamayaToken;
deployMamayaToken.tags = ["MamayaToken"];