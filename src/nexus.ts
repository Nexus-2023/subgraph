import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ClusterRecharged as ClusterRechargedEvent,
  RollupOperatorClusterChanged as RollupOperatorClusterChangedEvent,
  OwnerChanged as OwnerChangedEvent,
  RollupRegistered as RollupRegisteredEvent,
  RollupValidatorSlashed as RollupValidatorSlashedEvent,
  RollupWhitelisted as RollupWhitelistedEvent,
  SSVRecharged as SSVRechargedEvent,
  StakingLimitChanged as StakingLimitChangedEvent,
  ValidatorExited as ValidatorExitedEvent,
  ValidatorShareSubmitted as ValidatorShareSubmittedEvent,
  ValidatorSubmitted as ValidatorubmittedEvent,
  NexusFeeChanged as NexusFeeChangedEvent,
  ValidatorExitSubmitted as ValidatorExitSubmittedEvent,
  NodeOperatorContractChanged as NodeOperatorContractChangedEvent
} from "../generated/Nexus/Nexus"
import {
  Cluster,
  Constant,
  Change,
  Rollup,
  Validator,
  NodeOperators
} from "../generated/schema"

export function handleClusterRecharged(event: ClusterRechargedEvent):void {
  let entity = Cluster.load(event.params.clusterId.toString())
  if (entity!=null){
    entity.ssvFeePaid.plus(event.params.amount)
    entity.save()
  }
}

export function handleRollupOperatorClusterChanged(event: RollupOperatorClusterChangedEvent):void {
  let entity = Rollup.load(event.params.rollup_admin)
  if (entity!=null){
    entity.clusterId = event.params.operatorCluster
    entity.save()
  }
}

export function handleOwnerChanged(event: OwnerChangedEvent):void {
  let entity = Constant.load("NexusOwner")
  if(entity!=null){
    entity.value = event.params.newOwner.toHexString()
  }else{
    entity = new Constant("NexusOwner")
    entity.value = event.params.newOwner.toHexString()
  }
  entity.save()
}

export function handleRollupRegistered(event: RollupRegisteredEvent):void {
  let entity = Rollup.load(event.params.rollupAdmin)
  if(entity!=null){
    entity.clusterId = event.params.operatorCluster
    entity.bridgeContract = event.params.withdrawalAddress
    entity.nexusFeePercentage = event.params.nexusFee
    entity.stakingLimit = event.params.stakingLimit
    entity.save()
  }
}

export function handleRollupValidatorSlashed(event: RollupValidatorSlashedEvent):void {
  let entity = Rollup.load(event.params.admin)
  if(entity!=null){
    entity.slashing = event.params.amount
    entity.save()
  }
}

export function handleRollupWhitelisted(event: RollupWhitelistedEvent):void {
  let entity = Rollup.load(event.params.rollupAddress)
  if(entity!=null){
    entity.name = event.params.name;
  }else{
    entity = new Rollup(event.params.rollupAddress)
    entity.name = event.params.name;
    entity.executionRewards = BigInt.fromString("0");
  }
  entity.save()
}
export function handleSSVRecharged(event: SSVRechargedEvent):void {
  let entity = Constant.load("TotalSSVSent")
  if(entity!=null){
    entity.value = (BigInt.fromString(entity.value).plus(event.params.amount)).toString()
  }else{
    entity = new Constant("TotalSSVSent")
    entity.value = event.params.amount.toString()
  }
  entity.save()
}
export function handleStakingLimitChanged(event: StakingLimitChangedEvent):void {
  let entity = Rollup.load(event.params.rollupAdmin)
  if(entity!=null){
    entity.stakingLimit = event.params.StakingLimit
    entity.save()
  }
}
export function handleValidatorExited(event: ValidatorExitedEvent):void {
  let entity = Validator.load(event.params.pubKey)
  if (entity!=null){
    entity.status = "ValidatorExited"
  }
}
export function handleValidatorShareSubmitted(event: ValidatorShareSubmittedEvent):void {
  let entity = Validator.load(event.params.pubKey)
  if (entity!=null){
    entity.status = "ValidatorShareSubmitted"
  }
}

export function handleValidatorSubmitted(event: ValidatorubmittedEvent):void {
  let entity = new Validator(event.params.pubKey)
  let rollup = Rollup.load(event.params.rolupAdmin)
  if (rollup!=null){
    entity.clusterId = rollup.clusterId
    entity.rollup = event.params.rolupAdmin
    entity.status = "ValidatorActivated"
    entity.save()
  }
}
export function handleNodeOperatorContractChanged(event: NodeOperatorContractChangedEvent):void {
  let entity = Constant.load("NodeOperatorContractAddress")
  if(entity!=null){
    entity.value = event.params._nodeOperatorContract.toHexString()
  }else{
    entity = new Constant("NodeOperatorContractAddress")
    entity.value = event.params._nodeOperatorContract.toHexString()
  }
  entity.save()
}
export function handleValidatorExitSubmitted(event: ValidatorExitSubmittedEvent):void {
  let entity = Validator.load(event.params.pubKey)
  if (entity!=null){
    entity.status = "ValidatorExiting"
  }
}
