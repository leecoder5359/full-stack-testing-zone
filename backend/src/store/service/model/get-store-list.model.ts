import { PageModel } from '../../../common/model/page.model';

export class GetStoreListModel extends PageModel {
    minOrderPrice: number;
    maxDeliveryPrice: number;
}