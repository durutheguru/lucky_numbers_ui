import { Web } from '@/components/util';
import PageRequest from '@/components/core/PageRequest';
import { APISuccessCallback, APIErrorCallback} from '@/components/util/Web';


export default class PartnerService {


    public static getAllPartners(
        successHandler: APISuccessCallback, errorHandler: APIErrorCallback
    ) {
        Web.get('/api/v1/partner/search/findBy?sort=name,asc', successHandler, errorHandler);
    }


}



