import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  ClusterAdded,
  ClusterRecharged,
  OwnerChanged,
  RollupRegistered,
  RollupRewardsUpdated,
  RollupWhitelisted,
  SSVRecharged,
  StakingLimitChanged,
  ValidatorExited,
  ValidatorShareSubmitted,
  ValidatorSubmitted
} from "../generated/Nexus/Nexus"

export function createClusterAddedEvent(
  clusterId: BigInt,
  operatorIds: Array<BigInt>
): ClusterAdded {
  let clusterAddedEvent = changetype<ClusterAdded>(newMockEvent())

  clusterAddedEvent.parameters = new Array()

  clusterAddedEvent.parameters.push(
    new ethereum.EventParam(
      "clusterId",
      ethereum.Value.fromUnsignedBigInt(clusterId)
    )
  )
  clusterAddedEvent.parameters.push(
    new ethereum.EventParam(
      "operatorIds",
      ethereum.Value.fromUnsignedBigIntArray(operatorIds)
    )
  )

  return clusterAddedEvent
}

export function createClusterRechargedEvent(
  clusterId: BigInt,
  amount: BigInt
): ClusterRecharged {
  let clusterRechargedEvent = changetype<ClusterRecharged>(newMockEvent())

  clusterRechargedEvent.parameters = new Array()

  clusterRechargedEvent.parameters.push(
    new ethereum.EventParam(
      "clusterId",
      ethereum.Value.fromUnsignedBigInt(clusterId)
    )
  )
  clusterRechargedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return clusterRechargedEvent
}

export function createOwnerChangedEvent(
  oldOwner: Address,
  newOwner: Address
): OwnerChanged {
  let ownerChangedEvent = changetype<OwnerChanged>(newMockEvent())

  ownerChangedEvent.parameters = new Array()

  ownerChangedEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  ownerChangedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerChangedEvent
}

export function createRollupRegisteredEvent(
  rollupAdmin: Address,
  withdrawalAddress: Address
): RollupRegistered {
  let rollupRegisteredEvent = changetype<RollupRegistered>(newMockEvent())

  rollupRegisteredEvent.parameters = new Array()

  rollupRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "rollupAdmin",
      ethereum.Value.fromAddress(rollupAdmin)
    )
  )
  rollupRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawalAddress",
      ethereum.Value.fromAddress(withdrawalAddress)
    )
  )

  return rollupRegisteredEvent
}

export function createRollupRewardsUpdatedEvent(
  admin: Address,
  amount: BigInt,
  slashing: boolean
): RollupRewardsUpdated {
  let rollupRewardsUpdatedEvent = changetype<RollupRewardsUpdated>(
    newMockEvent()
  )

  rollupRewardsUpdatedEvent.parameters = new Array()

  rollupRewardsUpdatedEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )
  rollupRewardsUpdatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  rollupRewardsUpdatedEvent.parameters.push(
    new ethereum.EventParam("slashing", ethereum.Value.fromBoolean(slashing))
  )

  return rollupRewardsUpdatedEvent
}

export function createRollupWhitelistedEvent(
  name: string,
  rollupAddress: Address
): RollupWhitelisted {
  let rollupWhitelistedEvent = changetype<RollupWhitelisted>(newMockEvent())

  rollupWhitelistedEvent.parameters = new Array()

  rollupWhitelistedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  rollupWhitelistedEvent.parameters.push(
    new ethereum.EventParam(
      "rollupAddress",
      ethereum.Value.fromAddress(rollupAddress)
    )
  )

  return rollupWhitelistedEvent
}

export function createSSVRechargedEvent(
  sender: Address,
  amount: BigInt
): SSVRecharged {
  let ssvRechargedEvent = changetype<SSVRecharged>(newMockEvent())

  ssvRechargedEvent.parameters = new Array()

  ssvRechargedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  ssvRechargedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return ssvRechargedEvent
}

export function createStakingLimitChangedEvent(
  rollupAdmin: Address,
  oldStakingLimit: i32,
  newStakingLimit: i32
): StakingLimitChanged {
  let stakingLimitChangedEvent = changetype<StakingLimitChanged>(newMockEvent())

  stakingLimitChangedEvent.parameters = new Array()

  stakingLimitChangedEvent.parameters.push(
    new ethereum.EventParam(
      "rollupAdmin",
      ethereum.Value.fromAddress(rollupAdmin)
    )
  )
  stakingLimitChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldStakingLimit",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(oldStakingLimit))
    )
  )
  stakingLimitChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newStakingLimit",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newStakingLimit))
    )
  )

  return stakingLimitChangedEvent
}

export function createValidatorExitedEvent(
  admin: Address,
  publicKey: Bytes
): ValidatorExited {
  let validatorExitedEvent = changetype<ValidatorExited>(newMockEvent())

  validatorExitedEvent.parameters = new Array()

  validatorExitedEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )
  validatorExitedEvent.parameters.push(
    new ethereum.EventParam("publicKey", ethereum.Value.fromBytes(publicKey))
  )

  return validatorExitedEvent
}

export function createValidatorShareSubmittedEvent(
  pubKey: Bytes,
  rolupAdmin: Address
): ValidatorShareSubmitted {
  let validatorShareSubmittedEvent = changetype<ValidatorShareSubmitted>(
    newMockEvent()
  )

  validatorShareSubmittedEvent.parameters = new Array()

  validatorShareSubmittedEvent.parameters.push(
    new ethereum.EventParam("pubKey", ethereum.Value.fromBytes(pubKey))
  )
  validatorShareSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "rolupAdmin",
      ethereum.Value.fromAddress(rolupAdmin)
    )
  )

  return validatorShareSubmittedEvent
}

export function createValidatorSubmittedEvent(
  validators: Bytes,
  rolupAdmin: Address
): ValidatorSubmitted {
  let validatorSubmittedEvent = changetype<ValidatorSubmitted>(newMockEvent())

  validatorSubmittedEvent.parameters = new Array()

  validatorSubmittedEvent.parameters.push(
    new ethereum.EventParam("validators", ethereum.Value.fromBytes(validators))
  )
  validatorSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "rolupAdmin",
      ethereum.Value.fromAddress(rolupAdmin)
    )
  )

  return validatorSubmittedEvent
}
