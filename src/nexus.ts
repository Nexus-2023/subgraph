import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ClusterAdded as ClusterAddedEvent,
  ClusterRecharged as ClusterRechargedEvent,
  OwnerChanged as OwnerChangedEvent,
  RollupRegistered as RollupRegisteredEvent,
  RollupRewardsUpdated as RollupRewardsUpdatedEvent,
  RollupWhitelisted as RollupWhitelistedEvent,
  SSVRecharged as SSVRechargedEvent,
  StakingLimitChanged as StakingLimitChangedEvent,
  ValidatorExited as ValidatorExitedEvent,
  ValidatorShareSubmitted as ValidatorShareSubmittedEvent,
  ValidatorSubmitted as ValidatorSubmittedEvent
} from "../generated/Nexus/Nexus"
import {
  Cluster,
  Constants,
  Changes,
  Rollup,
  Validators
} from "../generated/schema"

export function handleClusterAdded(event: ClusterAddedEvent): void {
  let entity = new Cluster(event.params.clusterId.toString())
  entity.clusterId = event.params.clusterId.toI32()
  entity.operatorIds = event.params.operatorIds
  entity.ssvFeePaid = new BigInt(0)
  entity.save()
}

export function handleClusterRecharged(event: ClusterRechargedEvent): void {
  let entity = Cluster.load(event.params.clusterId.toString())
  if (entity != null) {
    entity.ssvFeePaid = event.params.amount
    entity.save()
  }
}

export function handleOwnerChanged(event: OwnerChangedEvent): void {
  let entity = Constants.load("owner")
  if (entity == null) {
    entity = new Constants("owner")
    entity.value = event.params.newOwner.toString()
  }
  else {
    let entity_2 = new Changes(event.transaction.hash)
    entity_2.oldValue = event.params.oldOwner.toHexString()
    entity_2.newValue = event.params.newOwner.toHexString()
    entity_2.save()
    entity.value = event.params.newOwner.toString()
  }
  entity.save()
}

export function handleRollupRegistered(event: RollupRegisteredEvent): void {
  let entity = Rollup.load(event.params.rollupAdmin)
  if (entity == null) {
    entity = new Rollup(event.params.rollupAdmin)
    entity.name = "";
  }
  entity.bridgeContract = event.params.withdrawalAddress
  entity.clusterId = event.params.operatorCluster.toI32()
  entity.stakingLimit = event.params.stakingLimit
  entity.rewards = new BigInt(0)
  entity.slashing = new BigInt(0)
  entity.validatorCount = 0
  entity.save()
}

export function handleRollupRewardsUpdated(
  event: RollupRewardsUpdatedEvent
): void {
  let entity = new Rollup(event.params.admin)
  if (event.params.slashing) {
    entity.slashing.plus(event.params.amount)
  }
  else {
    entity.rewards.plus(event.params.amount)
  }
  entity.save()
}

export function handleRollupWhitelisted(event: RollupWhitelistedEvent): void {
  let entity = Rollup.load(event.params.rollupAddress)
  if (entity == null) {
    entity = new Rollup(event.params.rollupAddress)
    entity.name = event.params.name
    entity.bridgeContract = new Address(0)
    entity.clusterId = 0
    entity.stakingLimit = 0
    entity.rewards = new BigInt(0)
    entity.slashing = new BigInt(0)
    entity.validatorCount = 0
  }
  else {
    entity.name = event.params.name
  }

  entity.save()
}

export function handleSSVRecharged(event: SSVRechargedEvent): void {
  let entity = Constants.load("Nexus_balance_ssv")
  if (entity == null) {
    entity = new Constants("Nexus_balance_ssv")
    entity.value = event.params.amount.toString()
  }
  else {
    let new_balance = BigInt.fromString(entity.value).plus(event.params.amount)
    entity.value = new_balance.toString()
  }
  entity.save()
}

export function handleStakingLimitChanged(
  event: StakingLimitChangedEvent
): void {
  let entity = Rollup.load(event.params.rollupAdmin)
  if (entity != null) {
    entity.stakingLimit = event.params.newStakingLimit
    let entity_2 = new Changes(event.transaction.hash)
    entity_2.name = "staking_limit_changed"
    entity_2.oldValue = event.params.oldStakingLimit.toString()
    entity_2.newValue = event.params.newStakingLimit.toString()
    entity_2.save()
    entity.save()
  }
}

export function handleValidatorExited(event: ValidatorExitedEvent): void {
  let entity = Validators.load(event.params.pubKey)
  if (entity != null) {
    entity.status = "Validator Exited"
    entity.save()
  }
}

export function handleValidatorShareSubmitted(
  event: ValidatorShareSubmittedEvent
): void {
  let entity = Validators.load(event.params.pubKey)
  if (entity != null) {
    entity.status = "Shares Submitted to SSV"
    entity.save()
  }

}

export function handleValidatorSubmitted(event: ValidatorSubmittedEvent): void {
  let entity = new Validators(
    event.params.pubKey
  )
  let rollup = Rollup.load(event.params.rolupAdmin)
  if (rollup != null) {
    entity.clusterId = rollup.clusterId
    entity.status = "Submitted to Bridge"
  }
  entity.save()
}
