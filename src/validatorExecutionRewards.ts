import { BigInt } from "@graphprotocol/graph-ts"
import {
  ExecutionRewardsReceived as ExecutionRewardsReceivedEvent,
  ChangeRewardBotAddress as ChangeRewardBotAddressEvent,
  ExecutionRewardSent as ExecutionRewardSentEvent,
  RollupExecutionRewardUpdated as RollupExecutionRewardUpdatedEvent,
} from "../generated/ValidatorExecutionRewards/ValidatorExecutionRewards"
import {
  Constant,
  Change,
  Rollup,
} from "../generated/schema"

export function handleExecutionRewardsReceived(event: ExecutionRewardsReceivedEvent): void {
  let entity = Constant.load("AllRewardRecieved")
  if (entity != null) {
    entity.value = (BigInt.fromString(entity.value).plus(event.params.rewards)).toString();
    entity.save()
  }
  else{
    entity = new Constant("AllRewardRecieved")
    entity.value = event.params.rewards.toString();
    entity.save()
  }
}

export function handleChangeRewardBotAddress(event: ChangeRewardBotAddressEvent): void {
  let entity = new Change(event.transaction.hash)
  let entity_constant = Constant.load("RewardBot")
  entity.name = "RewardBot"
  if(entity_constant != null){
    entity.oldValue = entity_constant.value;
    entity.newValue = event.params.reward_bot.toHexString();
    entity_constant.value = event.params.reward_bot.toHexString();
  }
  else{
    entity_constant = new Constant("RewardBot")
    entity.oldValue = "";
    entity.newValue = event.params.reward_bot.toHexString();
    entity_constant.value = event.params.reward_bot.toHexString();
  }
  entity.save()
  entity_constant.save()
}

export function handleExecutionRewardSent(event: ExecutionRewardSentEvent): void {
    // no need for this
}

export function handleRollupExecutionRewardUpdated(event: RollupExecutionRewardUpdatedEvent): void {
  let entity = Rollup.load(event.params.rollupAdmin)
  if(entity != null){
    entity.executionRewards.plus(event.params.rewards)
    entity.save()
  }
}